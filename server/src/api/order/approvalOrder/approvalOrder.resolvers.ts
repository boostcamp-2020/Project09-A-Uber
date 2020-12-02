import { Resolvers } from '@type/api';
import approvalOrder from '@services/order/approvalOrder';
import { UPDATE_ORDER_LIST } from '@api/order/updateOrderList/updateOrderList.resolvers';
import {
  ORDER_CALL_STATUS,
  OrderCallStatus,
} from '@api/order/subOrderCallStatus/subOrderCallStatus.resolvers';

const resolvers: Resolvers = {
  Mutation: {
    approvalOrder: async (_, { orderId }, { req, pubsub }) => {
      const { result, error } = await approvalOrder(req.user?._id || '', orderId);

      if (result === 'fail' || error) {
        return { result, error };
      }

      pubsub.publish(ORDER_CALL_STATUS, {
        subOrderCallStatus: { orderId, status: OrderCallStatus.APPROVAL },
      });
      pubsub.publish(UPDATE_ORDER_LIST, {
        updateOrderList: { result: 'success' },
      });

      return { result };
    },
  },
};

export default resolvers;
