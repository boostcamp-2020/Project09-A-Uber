/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
import { makeExecutableSchema, mergeTypeDefs, mergeResolvers, loadFilesSync } from 'graphql-tools';
import { ApolloServer } from 'apollo-server-express';
import { createTestClient, ApolloServerTestClient } from 'apollo-server-testing';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const { TEST_USER, TEST_DRIVER } = process.env;

const allTypes = loadFilesSync(path.join(__dirname, '../src/api/**/*.graphql'));

const allResolvers = loadFilesSync(path.join(__dirname, '../src/api/**/*.resolvers.ts'));

const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(allTypes),
  resolvers: mergeResolvers(allResolvers),
});

export enum UserType {
  user = 'user',
  driver = 'driver',
}

const RequestUser = {
  user: {
    user: {
      _id: TEST_USER,
      type: UserType.user,
    },
  },
  driver: {
    user: {
      _id: TEST_DRIVER,
      type: UserType.driver,
    },
  },
};

const client = (type: UserType): ApolloServerTestClient => {
  const server = new ApolloServer({
    schema,
    context: (ctx) => ({
      ...ctx,
      req: RequestUser[type],
      pubsub: { publish: jest.fn() },
    }),
  });

  return createTestClient(server);
};

export default client;
