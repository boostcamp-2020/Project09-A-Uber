import { Resolvers } from '@type/api';

import completeOrder from '@services/order/completeOrder';
import {
  ORDER_CALL_STATUS,
  OrderCallStatus,
} from '@api/order/subOrderCallStatus/subOrderCallStatus.resolvers';

const resolvers: Resolvers = {
  Mutation: {
    completeOrder: async (_, { orderId }, { pubsub }) => {
      const { result, error } = await completeOrder(orderId);

      if (result === 'fail' || error) {
        return { result, error };
      }
      pubsub.publish(ORDER_CALL_STATUS, {
        subOrderCallStatus: { orderId, status: OrderCallStatus.COMPLETED_DRIVE },
      });

      return { result };
    },
  },
};

export default resolvers;
