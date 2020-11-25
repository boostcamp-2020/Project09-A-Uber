import { Resolvers } from '@type/api';
import jwt from 'jsonwebtoken';
import UserModel from '@models/user';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
const JWT_HEADER = process.env.JWT_HEADER as string;

const EXPIRED = 1000 * 60 * 15;

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { email, password }, { res, authenticate }) => {
      const { user, info } = await authenticate('local', { email, password });

      if (!user) return { result: 'fail', error: info?.message };
      const userId = user?.get('_id');
      const payload = { id: userId };
      const accessToken = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '15m' });
      const refreshToken = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '14d' });

      await UserModel.updateOne({ _id: userId }, { refreshToken });

      res.cookie(JWT_HEADER, accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + EXPIRED),
      });

      return { result: 'success' };
    },
  },
};

export default resolvers;
