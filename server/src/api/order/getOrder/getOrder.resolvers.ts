import { Resolvers } from '@type/api';

import getOrder from '@services/order/getOrder';

const resolvers: Resolvers = {
  Query: {
    getOrderInfo: async (_, { orderId }, { req }) => {
      const { result, order, error } = await getOrder({ orderId, driverId: req.user?._id || '' });

      if (!order && result === 'fail') {
        return { result: 'fail', order, error };
      }

      return { result, order, error };
    },
  },
};

export default resolvers;
