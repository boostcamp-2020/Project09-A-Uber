import { ApolloServer, PubSub } from 'apollo-server-express';
import express, { Express } from 'express';
import { createServer, Server } from 'http';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { buildContext } from 'graphql-passport';

import schema from '@config/schema';
import passportInit from '@passport/.';

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
      context: (ctx) => buildContext({ ...ctx, pubsub: this.pubsub }),
      playground: true,
    });
    this.server = createServer(this.app);
    this.middlewares();
  }

  private middlewares() {
    const corsOptions: CorsOptions = {
      credentials: true,
    };
    if (prod) {
      corsOptions.origin = /ikeytax\.tk$/;
      this.app.use(helmet());
      this.app.use(hpp());
      this.app.use(morgan('combined'));
    } else {
      corsOptions.origin = 'http://localhost:3000';
      this.app.use(morgan('dev'));
      this.app.use(express.json());
    }
    this.app.use(cors(corsOptions));
    this.app.use(cookieParser());
    this.app.use(compression());
    passportInit();
    this.apolloServer.applyMiddleware({
      app: this.app,
      path: GRAPHQL_ENDPOINT,
      cors: corsOptions,
    });
    this.apolloServer.installSubscriptionHandlers(this.server);
  }
}

export default new App();
