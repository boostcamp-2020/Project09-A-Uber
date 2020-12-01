import {
  useApolloClient,
  useQuery,
  QueryHookOptions,
  MutationHookOptions,
  ApolloError,
  ServerParseError,
  QueryResult,
  ApolloClient,
  ApolloQueryResult,
  useMutation,
  MutationTuple,
} from '@apollo/react-hooks';
import { DocumentNode } from 'graphql';
import { REQUEST_TOKEN } from '@queries/token.queries';

import { RequestToken } from '@/types/api';

const SUCCESS = 'success';

interface QueryWrapper<T> extends QueryResult<T, Record<string, any>> {
  callQuery: (variables?: any) => Promise<ApolloQueryResult<T>>;
}

const errorHandler = async (
  error: ApolloError,
  apolloClient: ApolloClient<any>,
  request: (...args: any) => any,
) => {
  const { statusCode } = error.networkError as ServerParseError;
  if (statusCode === 401) {
    const result = await apolloClient.mutate<RequestToken>({ mutation: REQUEST_TOKEN });
    if (result?.data?.requestToken.result === SUCCESS) {
      const reResponseData = await request();
      return reResponseData;
    }
  }
  return undefined;
};

export const useCustomQuery = <T>(
  query: DocumentNode,
  options?: QueryHookOptions<T>,
): QueryWrapper<T> => {
  const apolloClient = useApolloClient();
  const queryResult = useQuery<T>(query, {
    ...options,
    onError: (error: ApolloError) => {
      errorHandler(error, apolloClient, queryResult.refetch).then(() => {
        if (options?.onError) {
          options.onError(error);
        }
      });
    },
  });

  const callQuery = async (variables?: any) => {
    try {
      return await queryResult.refetch(variables);
    } catch (error) {
      const result = await errorHandler(error, apolloClient, queryResult.refetch);
      return result;
    }
  };

  return { ...queryResult, callQuery };
};

export const useCustomMutation = <T = any>(
  query: DocumentNode,
  options?: MutationHookOptions<T>,
): MutationTuple<T, Record<string, any>> => {
  const apolloClient = useApolloClient();
  const mutationTuple = useMutation<T>(query, {
    ...options,
    onError: (error: ApolloError) => {
      errorHandler(error, apolloClient, mutationTuple[0]).then(() => {
        if (options?.onError) {
          options.onError(error);
        }
      });
    },
  });

  return mutationTuple;
};
