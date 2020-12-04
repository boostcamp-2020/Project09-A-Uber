import { Resolvers } from '@type/api';
import getDriverLocation from '@services/user/getDriverLocation';
import { Message } from '@util/server-message';

const resolvers: Resolvers = {
  Query: {
    getDriverLocation: async (_, { orderId }) => {
      const { result, error, driverLocation } = await getDriverLocation(orderId);
      if (!driverLocation) {
        return { result, error: Message.OrderNotFound };
      }
      if (result === 'fail') {
        return { result, error };
      }

      return { result: 'true', driverLocation };
    },
  },
};

export default resolvers;
