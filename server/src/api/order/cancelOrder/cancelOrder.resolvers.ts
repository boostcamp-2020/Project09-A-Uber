import { Resolvers } from '@type/api';
import cancelOrder from '@services/order/cancelOrder';

import { UPDATE_ORDER_LIST } from '../updateOrderList/updateOrderList.resolvers';

const resolvers: Resolvers = {
  Mutation: {
    cancelOrder: async (_, { orderId }, { req, pubsub }) => {
      const { result, error } = await cancelOrder(req.user?._id || '', orderId);

      if (result === 'fail' || error) {
        return { result, error };
      }

      pubsub.publish(UPDATE_ORDER_LIST, { updateOrderList: { result: 'success' } });

      return { result };
    },
  },
};

export default resolvers;
