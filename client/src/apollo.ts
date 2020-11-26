import { ApolloClient, HttpLink, split, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { OperationDefinitionNode } from 'graphql';

const URI = process.env.API_URI || 'http://localhost:4000';
const SOCKET_URI = process.env.SOCKET_URI || 'ws://localhost:4000';

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

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
