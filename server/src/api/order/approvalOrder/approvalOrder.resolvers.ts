import { Resolvers } from '@type/api';
import approvalOrder from '@services/order/approvalOrder';
import { UPDATE_ORDER_LIST } from '@api/order/updateOrderList/updateOrderList.resolvers';

export const APPROVAL_ORDER = 'APPROVAL_ORDER';

const resolvers: Resolvers = {
  Mutation: {
    approvalOrder: async (_, { orderId }, { req, pubsub }) => {
      const { result, error, unassignedOrders } = await approvalOrder(req.user?._id || '', orderId);

      if (result === 'fail' || error) {
        return { result, error };
      }

      pubsub.publish(APPROVAL_ORDER, { subApprovalOrder: { approvalOrderId: orderId } });
      pubsub.publish(UPDATE_ORDER_LIST, {
        updateOrderList: { unassignedOrders, result: 'success' },
      });

      return { result };
    },
  },
};

export default resolvers;
