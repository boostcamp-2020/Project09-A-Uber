import { Resolvers } from '@type/api';
import cancelOrder from '@services/order/cancelOrder';

const resolvers: Resolvers = {
  Mutation: {
    cancelOrder: async (_, { orderId }, { req }) => {
      const { result, error } = await cancelOrder(req.user?._id || '', orderId);

      if (result === 'fail' || error) {
        return { result, error };
      }

      return { result };
    },
  },
};

export default resolvers;
