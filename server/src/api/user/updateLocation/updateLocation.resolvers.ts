import { Resolvers } from '@type/api';
import updateLocation from '@services/user/updateLocation';
import { loginType } from '@models/user';
import Order from '@models/order';

export const DIRVER_UPADTE = 'DIRVER_UPADTE';

const resolvers: Resolvers = {
  Mutation: {
    updateLocation: async (_, { curLocation }, { req, pubsub }) => {
      const { result, error } = await updateLocation({ userId: req.user?._id, curLocation });

      if (req.user?.type === loginType.user) {
        const order = await Order.findOne({ user: req.user._id, status: 'waiting' });
        if (order) {
          pubsub.publish('DIRVER_UPADTE', {
            subLocation: { ...curLocation, orderId: order._id },
          });
        }
      }

      if (result === 'fail') {
        return { result, error: 'no' };
      }

      return { result };
    },
  },
};

export default resolvers;
