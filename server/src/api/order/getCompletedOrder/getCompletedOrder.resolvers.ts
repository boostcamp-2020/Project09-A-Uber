import { Resolvers } from '@type/api';
import getCompletedOrders from '@services/order/getCompletedOrders';

const resolvers: Resolvers = {
  Query: {
    getCompletedOrders: async (_, __, { req }) => {
      const { result, completedOrders, error } = await getCompletedOrders({
        userId: req.user?._id || '',
        userType: req.user?.type,
      });

      if (!completedOrders && (result === 'fail' || error)) {
        return { result, error };
      }

      return { result, completedOrders };
    },
  },
};

export default resolvers;
