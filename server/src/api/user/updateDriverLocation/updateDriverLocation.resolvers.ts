import { Resolvers } from '@type/api';
import getActiveDriverOrder from '@services/order/getActiveDriverOrder';
import updateDriverLocation from '@services/user/updateDriverLocation';

export const UPDATE_DRIVER_LOCATION = 'UPDATE_DRIVER_LOCATION';

const resolvers: Resolvers = {
  Mutation: {
    updateDriverLocation: async (_, { lat, lng }, { req, pubsub }) => {
      const { result, error } = await updateDriverLocation({
        userId: req.user?._id,
        userType: req.user?.type,
        curLocation: { coordinates: [lat, lng] },
      });

      if (result === 'fail') {
        return { result, error };
      }

      const { result: inquiryResult, order, error: inquiryError } = await getActiveDriverOrder(
        req.user?._id || '',
      );
      if (inquiryResult === 'success' && order) {
        pubsub.publish(UPDATE_DRIVER_LOCATION, {
          subDriverLocation: { coordinates: [lat, lng], orderId: order._id },
        });
      }
      if (inquiryResult === 'fail') {
        return { result: inquiryResult, error: inquiryError };
      }

      return { result };
    },
  },
};

export default resolvers;
