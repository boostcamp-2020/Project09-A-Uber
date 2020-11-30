import { Resolvers } from '@type/api';
import updateDriverLocation from '@services/user/updateDriverLocation';
import { loginType } from '@models/user';
import Order from '@models/order';

export const DIRVER_UPADTE = 'DIRVER_UPADTE';

const resolvers: Resolvers = {
  Mutation: {
    updateDriverLocation: async (_, { curLocation }, { req, pubsub }) => {
      const { result, error } = await updateDriverLocation({
        userId: req.user?._id,
        userType: req.user?.type,
        curLocation,
      });
      const order = await Order.findOne({ user: req.user?._id, status: 'waiting' });
      if (order) {
        pubsub.publish(DIRVER_UPADTE, {
          subLocation: { ...curLocation, orderId: order._id },
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
