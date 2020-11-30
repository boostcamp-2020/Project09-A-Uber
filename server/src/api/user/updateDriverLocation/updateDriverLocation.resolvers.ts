import { Resolvers } from '@type/api';
import updateDriverLocation from '@services/user/updateDriverLocation';
import Order from '@models/order';

export const UPDATE_DRIVER_LOCATION = 'UPDATE_DRIVER_LOCATION';

const resolvers: Resolvers = {
  Mutation: {
    updateDriverLocation: async (_, { lat, lng }, { req, pubsub }) => {
      const { result, error } = await updateDriverLocation({
        userId: req.user?._id,
        userType: req.user?.type,
        curLocation: { coordinates: [lat, lng] },
      });
      const order = await Order.findOne({ driver: req.user?._id, status: 'activate' });
      if (order) {
        pubsub.publish(UPDATE_DRIVER_LOCATION, {
          subLocation: { coordinates: [lat, lng], orderId: order._id },
        });
      }

      if (result === 'fail') {
        return { result, error };
      }

      return { result };
    },
  },
};

export default resolvers;
