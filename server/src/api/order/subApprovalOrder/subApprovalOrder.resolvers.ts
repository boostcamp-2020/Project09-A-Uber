import { Resolvers } from '@type/api';
import { withFilter } from 'apollo-server-express';

import { APPROVAL_ORDER } from '@api/order/approvalOrder/approvalOrder.resolvers';

const resolvers: Resolvers = {
  Subscription: {
    subApprovalOrder: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator(APPROVAL_ORDER),
        (payload, variables) =>
          payload.subApprovalOrder.approvalOrderId === variables.orderId || variables.isDriver,
      ),
    },
  },
};

export default resolvers;
