import { ApolloServer } from 'apollo-server-express';
import express, { Express } from 'express';
import { createServer, Server } from 'http';
import { PubSub } from 'graphql-subscriptions';

import schema from '@config/schema';

const GRAPHQL_ENDPOINT = '/graphql';

class App {
  public app: Express;

  public server: Server;

  private pubsub: PubSub;

  private apolloServer: ApolloServer;

  constructor() {
    this.pubsub = new PubSub();
    this.app = express();
    this.apolloServer = new ApolloServer({
      schema,
      context: (ctx) => ({ ...ctx, pubsub: this.pubsub }),
      playground: true,
    });
    this.server = createServer(this.app);
    this.middlewares();
  }

  private middlewares() {
    this.apolloServer.applyMiddleware({
      app: this.app,
      path: GRAPHQL_ENDPOINT,
    });
    this.apolloServer.installSubscriptionHandlers(this.server);
  }
}

export default new App();
