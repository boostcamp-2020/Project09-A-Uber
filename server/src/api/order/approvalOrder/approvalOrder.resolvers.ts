import { Resolvers } from '@type/api';
import approvalOrder from '@services/order/approvalOrder';

export const APPROVAL_ORDER = 'APPROVAL_ORDER';

const resolvers: Resolvers = {
  Mutation: {
    approvalOrder: async (_, { orderId }, { req, pubsub }) => {
      const { result, error } = await approvalOrder(req.user?._id || '', orderId);

      if (result === 'fail' || error) {
        return { result, error };
      }

      pubsub.publish(APPROVAL_ORDER, { subApprovalOrder: { approvalOrderId: orderId } });

      return { result };
    },
  },
};

export default resolvers;
