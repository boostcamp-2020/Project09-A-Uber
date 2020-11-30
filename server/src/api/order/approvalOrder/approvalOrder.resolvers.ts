import { Resolvers } from '@type/api';
import approvalOrder from '@services/order/approvalOrder';

const resolvers: Resolvers = {
  Mutation: {
    approvalOrder: async (_, { orderId }, { req }) => {
      const { result, error } = await approvalOrder(req.user?._id || '', orderId);

      if (result === 'fail' || error) {
        return { result, error };
      }

      return { result };
    },
  },
};

export default resolvers;
