import { Resolvers } from '@type/api';
import updateDriverLocation from '@services/user/updateDriverLocation';

export const UPDATE_DRIVER_LOCATION = 'UPDATE_DRIVER_LOCATION';

const resolvers: Resolvers = {
  Mutation: {
    updateDriverLocation: async (_, { lat, lng }, { req, pubsub }) => {
      const { result, orderId, error } = await updateDriverLocation({
        userId: req.user?._id,
        userType: req.user?.type,
        curLocation: { coordinates: [lat, lng] },
      });
      console.log(orderId);
      pubsub.publish(UPDATE_DRIVER_LOCATION, {
        subDriverLocation: { coordinates: [lat, lng], orderId },
      });

      if (result === 'fail') {
        return { result, error };
      }

      return { result };
    },
  },
};

export default resolvers;
