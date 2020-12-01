import { Resolvers } from '@type/api';

import getOrderById from '@services/order/getOrderById';

const resolvers: Resolvers = {
  Query: {
    getOrderById: async (_, { orderId }, { req }) => {
      const { result, order, error } = await getOrderById(orderId);
      if (!order && result === 'fail') {
        return { result: 'fail', order, error };
      }

      return { result, order, error };
    },
  },
};

export default resolvers;
