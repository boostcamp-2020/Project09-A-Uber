import { ApolloServer } from 'apollo-server-express';
import express, { Express } from 'express';
import { createServer, Server } from 'http';
import { PubSub } from 'graphql-subscriptions';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';

import schema from '@config/schema';
import loginRouter from '@api/login/index';

dotenv.config();

const GRAPHQL_ENDPOINT = '/graphql';

const prod = process.env.NODE_ENV === 'production';

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
    if (prod) {
      this.app.use(helmet());
      this.app.use(hpp());
      this.app.use(morgan('combined'));
      this.app.use(
        cors({
          origin: /ikeytax\.tk$/,
          credentials: true,
        }),
      );
    } else {
      this.app.use(morgan('dev'));
      this.app.use(express.json());
      this.app.use('/api/login', loginRouter);
      this.app.use(
        cors({
          origin: true,
          credentials: true,
        }),
      );
    }

    this.app.use(compression());
    this.apolloServer.applyMiddleware({
      app: this.app,
      path: GRAPHQL_ENDPOINT,
    });
    this.apolloServer.installSubscriptionHandlers(this.server);
  }
}

export default new App();
