import { Resolvers } from '@type/api';

import getUser from '@services/user/getUser';

const resolvers: Resolvers = {
  Query: {
    getUserInfo: async (_, __, { req }) => {
      const { user, error } = await getUser(req.user?.id || '');

      if (error) {
        return { error };
      }

      return { user };
    },
  },
};

export default resolvers;
