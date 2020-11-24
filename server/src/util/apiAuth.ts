import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { PubSub } from 'graphql-subscriptions';

interface SECRET_KEY {
  JWT_SECRET_KEY?: string | undefined;
}

interface User {
  email?: string;
  iat?: number;
  exp?: number;
}

const { JWT_SECRET_KEY }: SECRET_KEY = process.env;
const REQUEST_TOKEN = 'requestToken';

const apiAuth = (ctx: ExpressContext, pubsub: PubSub) => {
  const { query } = ctx.req.body;
  const isRequestTokenMutation = query.split('\n')[1].includes(REQUEST_TOKEN);
  const accessToken: string | undefined = ctx.req.headers.authorization?.replace('Bearer ', '');

  if (!isRequestTokenMutation) {
    try {
      const data = jwt.verify(accessToken!, JWT_SECRET_KEY!) as User;
      ctx.req.user = data.email;

      return { ...ctx, pubsub };
    } catch (error) {
      const { message } = error;
      throw new AuthenticationError(message);
    }
  }

  return { ...ctx, pubsub };
};

export default apiAuth;
