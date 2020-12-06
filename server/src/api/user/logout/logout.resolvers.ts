import { Resolvers } from '@type/api';

import deleteRefreshToken from '@services/user/deleteRefreshToken';

const JWT_HEADER = process.env.JWT_HEADER as string;

const resolvers: Resolvers = {
  Mutation: {
    logout: async (_, __, { req, res }) => {
      const { result, error } = await deleteRefreshToken(req.user?._id || '');

      if (result === 'fail' || error) {
        return { result, error };
      }

      res.clearCookie(JWT_HEADER);
      return { result };
    },
  },
};

export default resolvers;
