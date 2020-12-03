import { Resolvers } from '@type/api';

import getUserWithOrder from '@services/user/getUserWithOrder';

const resolvers: Resolvers = {
  Query: {
    getUserWithOrder: async (_, __, { req }) => {
      const { result, user, order, error } = await getUserWithOrder(
        req.user?._id || '',
        req.user?.type || '',
      );

      if (error) return { result, error };

      return { result, user, order };
    },
  },
};

export default resolvers;
