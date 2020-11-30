import { Resolvers } from '@type/api';
import updateDriverLocation from '@services/user/updateDriverLocation';
import { loginType } from '@models/user';
import Order from '@models/order';

export const DIRVER_UPADTE = 'DIRVER_UPADTE';

const resolvers: Resolvers = {
  Mutation: {
    updateDriverLocation: async (_, { curLocation }, { req, pubsub }) => {
      if (req.user?.type !== loginType.driver) {
        return { result: 'fail', error: 'Bad Request' };
      }

      const { result, error } = await updateDriverLocation({ userId: req.user?._id, curLocation });
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
