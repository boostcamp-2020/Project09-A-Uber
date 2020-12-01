import { Resolvers } from '@type/api';
import createOrder from '@services/order/createOrder';

import { UPDATE_ORDER_LIST } from '@api/order/updateOrderList/updateOrderList.resolvers';

const resolvers: Resolvers = {
  Mutation: {
    createOrder: async (_, { startingPoint, destination }, { req, pubsub }) => {
      const { result, orderId, error } = await createOrder({
        startingPoint,
        destination,
        user: req.user?._id || '',
      });

      if (result === 'fail' || error) {
        return { result, error };
      }

      pubsub.publish(UPDATE_ORDER_LIST, { updateOrderList: { result: 'success' } });

      return { result, orderId };
    },
  },
};

export default resolvers;
