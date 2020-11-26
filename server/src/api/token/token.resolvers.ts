import { Resolvers } from '@type/api';
import jwt from 'jsonwebtoken';
import UserModel from '@models/user';

interface User {
  id?: string;
  iat?: number;
  exp?: number;
}

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
const JWT_HEADER = process.env.JWT_HEADER as string;
const EXPIRED = 1000 * 60 * 60 * 24 * 14;

const resolvers: Resolvers = {
  Mutation: {
    requestToken: async (root, args, context) => {
      try {
        const token = context.req.cookies[JWT_HEADER];
        const data = jwt.verify(token, JWT_SECRET_KEY, { ignoreExpiration: true }) as User;
        const user = await UserModel.findById(data.id);
        const userRefreshToken = user?.get('refreshToken');
        const isRefreshToken = jwt.verify(userRefreshToken, JWT_SECRET_KEY);

        if (isRefreshToken) {
          const payload = { id: data?.id };
          const newAccessToken = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '15m' });
          const newRefreshToken = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '14d' });

          await UserModel.updateOne({ id: data?.id }, { refreshToken: newRefreshToken });
          context.res.cookie(JWT_HEADER, newAccessToken, {
            httpOnly: true,
            maxAge: EXPIRED,
          });

          return { result: 'success' };
        }

        return { result: 'fail' };
      } catch (error) {
        console.log(error);
        return { result: 'fail', message: error.message };
      }
    },
  },
};

export default resolvers;
