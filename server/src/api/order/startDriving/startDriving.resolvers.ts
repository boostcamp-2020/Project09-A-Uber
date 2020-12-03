import { Resolvers } from '@type/api';

import startDriving from '@services/order/startDriving';
import {
  ORDER_CALL_STATUS,
  OrderCallStatus,
} from '@api/order/subOrderCallStatus/subOrderCallStatus.resolvers';

const resolvers: Resolvers = {
  Mutation: {
    startDriving: async (_, { orderId }, { pubsub }) => {
      const { result, error } = await startDriving(orderId);

      if (result === 'fail') return { result, error };

      pubsub.publish(ORDER_CALL_STATUS, {
        subOrderCallStatus: { orderId, status: OrderCallStatus.STARTED_DRIVE },
      });
      return { result };
    },
  },
};

export default resolvers;
