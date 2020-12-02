import { Resolvers } from '@type/api';
import createOrder from '@services/order/createOrder';
import { UPDATE_ORDER_LIST } from '@api/order/updateOrderList/updateOrderList.resolvers';

export const CREATE_NEW_ORDER = 'CREATE_NEW_ORDER';

const resolvers: Resolvers = {
  Mutation: {
    createOrder: async (_, { startingPoint, destination }, { req, pubsub }) => {
      const { result, orderId, error, createdOrder } = await createOrder({
        startingPoint,
        destination,
        user: req.user?._id || '',
      });
      if (result === 'fail' || error) {
        return { result, error };
      }
      pubsub.publish(CREATE_NEW_ORDER, {
        subNewOrder: { newOrder: createdOrder },
      });
      pubsub.publish(UPDATE_ORDER_LIST, { updateOrderList: { result: 'success' } });

      return { result, orderId };
    },
  },
};

export default resolvers;
