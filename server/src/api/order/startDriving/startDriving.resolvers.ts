import { Resolvers } from '@type/api';

import {
  ORDER_CALL_STATUS,
  OrderCallStatus,
} from '@api/order/subOrderCallStatus/subOrderCallStatus.resolvers';

const resolvers: Resolvers = {
  Mutation: {
    startDriving: (_, { orderId }, { pubsub }) => {
      pubsub.publish(ORDER_CALL_STATUS, {
        subOrderCallStatus: { orderId, status: OrderCallStatus.STARTED_DRIVE },
      });
      return { result: 'success' };
    },
  },
};

export default resolvers;
