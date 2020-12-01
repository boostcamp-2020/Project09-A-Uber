/* eslint-disable @typescript-eslint/ban-types */
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
  OperationVariables,
} from '@apollo/react-hooks';
import { DocumentNode } from 'graphql';
import { REQUEST_TOKEN } from '@queries/token.queries';

import { RequestToken } from '@/types/api';

const SUCCESS = 'success';

interface QueryWrapper<TData, TVariables> extends QueryResult<TData, TVariables> {
  callQuery: (variables?: Partial<TVariables>) => Promise<ApolloQueryResult<TData>>;
}

const errorHandler = async <TData>(
  error: ApolloError,
  apolloClient: ApolloClient<object>,
  request: (...args: any) => TData,
) => {
  const { statusCode } = error.networkError as ServerParseError;
  if (statusCode !== 401) {
    throw new ApolloError(error);
  }
  const result = await apolloClient.mutate<RequestToken>({ mutation: REQUEST_TOKEN });
  if (result?.data?.requestToken.result === SUCCESS) {
    const reResponseData = await request();
    return reResponseData;
  }

  throw new ApolloError(error);
};

export const useCustomQuery = <TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>,
): QueryWrapper<TData, TVariables> => {
  const apolloClient = useApolloClient();
  const queryResult = useQuery<TData, TVariables>(query, {
    ...options,
    onError: (error: ApolloError) => {
      errorHandler(error, apolloClient, queryResult.refetch).catch((apolloError) => {
        if (options?.onError) {
          options.onError(apolloError);
        }
      });
    },
  });

  const callQuery = async (variables?: Partial<TVariables>) => {
    try {
      return await queryResult.refetch(variables);
    } catch (error) {
      const result = await errorHandler(error, apolloClient, queryResult.refetch);
      return result;
    }
  };

  return { ...queryResult, callQuery };
};

export const useCustomMutation = <TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: MutationHookOptions<TData, TVariables>,
): MutationTuple<TData, TVariables> => {
  const apolloClient = useApolloClient();
  const mutationTuple = useMutation<TData, TVariables>(query, {
    ...options,
    onError: (error: ApolloError) => {
      errorHandler(error, apolloClient, mutationTuple[0]).catch((apolloError) => {
        if (options?.onError) {
          options.onError(apolloError);
        }
      });
    },
  });
  return mutationTuple;
};
