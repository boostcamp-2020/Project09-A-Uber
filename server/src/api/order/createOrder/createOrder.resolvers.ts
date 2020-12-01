import { Resolvers } from '@type/api';
import createOrder from '@services/order/createOrder';

export const CREATE_NEW_ORDER = 'CREATE_NEW_ORDER';

const resolvers: Resolvers = {
  Mutation: {
    createOrder: async (_, { startingPoint, destination }, { req, pubsub }) => {
      const { result, orderId, error, createdOrder } = await createOrder({
        startingPoint,
        destination,
        user: req.user?._id || '',
      });

      pubsub.publish(CREATE_NEW_ORDER, {
        subNewOrder: { newOrder: createdOrder },
      });

      if (result === 'fail' || error) {
        return { result, error };
      }

      return { result, orderId };
    },
  },
};

export default resolvers;
