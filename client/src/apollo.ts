import { ApolloClient, HttpLink, split, InMemoryCache, DefaultOptions } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { OperationDefinitionNode } from 'graphql';

const URI = process.env.REACT_APP_API_URI || 'http://localhost:4000';
const SOCKET_URI = process.env.REACT_APP_SOCKET_URI || 'ws://localhost:4000';

const httpLink = new HttpLink({
  uri: `${URI}/graphql`,
  credentials: 'include',
});

const wsLink = new WebSocketLink({
  uri: `${SOCKET_URI}/graphql`,
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions,
});

export default client;
