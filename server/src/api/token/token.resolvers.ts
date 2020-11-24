import { AuthenticationError } from 'apollo-server-express';
import { Resolvers } from '@type/api';
import jwt from 'jsonwebtoken';
import UserModel from '@models/user';

type Token = string | undefined;

interface SECRET_KEY {
  JWT_SECRET_KEY?: string | undefined;
}

interface User {
  email?: string;
  iat?: number;
  exp?: number;
}

const { JWT_SECRET_KEY }: SECRET_KEY = process.env;
const JWT_INVALID = 'invalid token';

const resolvers: Resolvers = {
  Mutation: {
    requestToken: async (root, args, context) => {
      try {
        const token: Token = context.req.headers.authorization?.replace('Bearer ', '');
        const data = jwt.verify(token!, JWT_SECRET_KEY!, { ignoreExpiration: true }) as User;
        const user = await UserModel.findOne({ email: data.email });
        const isRefreshToken = user?.get('refreshToken');

        if (isRefreshToken) {
          const payload = { email: data?.email };
          const newAccessToken = jwt.sign(payload, JWT_SECRET_KEY!, { expiresIn: '15m' });
          const newRefreshToken = jwt.sign(payload, JWT_SECRET_KEY!, { expiresIn: '14d' });

          await UserModel.updateOne({ email: data?.email }, { refreshToken: newRefreshToken });

          return { result: true, accessToken: newAccessToken };
        }
        throw new AuthenticationError(JWT_INVALID);
      } catch (error) {
        throw new AuthenticationError(error);
      }
    },
  },
};

export default resolvers;
