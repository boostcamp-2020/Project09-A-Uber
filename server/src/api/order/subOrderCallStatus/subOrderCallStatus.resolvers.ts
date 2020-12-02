import { Resolvers } from '@type/api';
import { withFilter } from 'apollo-server-express';

export const ORDER_CALL_STATUS = 'ORDER_CALL_STATUS';

// eslint-disable-next-line no-shadow
export const enum OrderCallStatus {
  APPROVAL = 'approval',
  STARED_DRIVE = 'staredDrive',
  COMPELETED_DRIVE = 'compeletedDrive',
}

const resolvers: Resolvers = {
  Subscription: {
    subOrderCallStatus: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator(ORDER_CALL_STATUS),
        (payload, variables) => payload.subOrderCallStatus.orderId === variables.orderId,
      ),
    },
  },
};

export default resolvers;
