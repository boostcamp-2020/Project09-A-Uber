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
import { useHistory } from 'react-router-dom';
import { History } from 'history';

import { RequestToken } from '@/types/api';

const SUCCESS = 'success';

interface QueryWrapper extends QueryResult<any, Record<string, any>> {
  callQuery: (variables?: any) => Promise<ApolloQueryResult<any> | undefined>;
}

const errorHandler = async (
  error: ApolloError,
  apolloClient: ApolloClient<any>,
  request: (...args: any) => any,
  history: History,
) => {
  const { statusCode } = error.networkError as ServerParseError;
  if (statusCode === 401) {
    const result = await apolloClient.mutate<RequestToken>({ mutation: REQUEST_TOKEN });
    if (result?.data?.requestToken.result === SUCCESS) {
      const reResponseData = await request();

      return reResponseData;
    }
    history.push('/signin');
  }
  return undefined;
};

export const useCustomQuery = <T = any>(
  query: DocumentNode,
  options?: QueryHookOptions<T>,
): QueryWrapper => {
  const apolloClient = useApolloClient();
  const history = useHistory();
  const queryResult = useQuery<T>(query, {
    ...options,
    onError: (error: ApolloError) => {
      errorHandler(error, apolloClient, queryResult.refetch, history).then(() => {
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
      const result = await errorHandler(error, apolloClient, queryResult.refetch, history);
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
  const history = useHistory();
  const mutationTuple = useMutation<T>(query, {
    ...options,
    onError: (error: ApolloError) => {
      errorHandler(error, apolloClient, mutationTuple[0], history).then(() => {
        if (options?.onError) {
          options.onError(error);
        }
      });
    },
  });

  return mutationTuple;
};
