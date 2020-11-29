import { Resolvers } from '@type/api';
import createOrder from '@services/order/createOrder';

const resolvers: Resolvers = {
  Mutation: {
    createOrder: async (_, { startingPoint, destination }, { req }) => {
      const { result, orderId, error } = await createOrder({
        startingPoint,
        destination,
        user: req.user?._id || '',
      });

      if (result === 'fail' || error) {
        return { result, error };
      }

      return { result, orderId };
    },
  },
};

export default resolvers;
