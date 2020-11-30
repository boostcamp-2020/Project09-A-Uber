import { Resolvers } from '@type/api';

import getOrder from '@services/order/getOrder';

const resolvers: Resolvers = {
  Query: {
    getOrderInfo: async (_, { orderId }, { req }) => {
      console.log('test');
      const { result, order, error } = await getOrder({
        orderId,
        userId: req.user?._id || '',
        userType: req.user?.type,
      });

      if (!order && result === 'fail') {
        return { result: 'fail', order, error };
      }

      return { result, order, error };
    },
  },
};

export default resolvers;
