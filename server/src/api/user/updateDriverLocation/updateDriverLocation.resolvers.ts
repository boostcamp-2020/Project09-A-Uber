import { Resolvers } from '@type/api';
import getApprovalDriverOrder from '@services/order/getApprovalDriverOrder';
import updateDriverLocation from '@services/user/updateDriverLocation';
import { UPDATE_ORDER_LIST } from '@api/order/updateOrderList/updateOrderList.resolvers';

export const UPDATE_DRIVER_LOCATION = 'UPDATE_DRIVER_LOCATION';

const resolvers: Resolvers = {
  Mutation: {
    updateDriverLocation: async (_, { lat, lng }, { req, pubsub }) => {
      const { result, error } = await updateDriverLocation({
        userId: req.user?._id,
        userType: req.user?.type,
        curLocation: { coordinates: [lat, lng] },
      });

      if (result === 'fail') {
        return { result, error };
      }

      pubsub.publish(UPDATE_ORDER_LIST, { updateOrderList: { result: 'success' } });

      const { result: inquiryResult, order, error: inquiryError } = await getApprovalDriverOrder(
        req.user?._id || '',
      );
      if (inquiryResult === 'success' && order) {
        pubsub.publish(UPDATE_DRIVER_LOCATION, {
          subDriverLocation: { coordinates: [lat, lng], orderId: order._id },
        });
      }
      if (inquiryResult === 'fail') {
        return { result: inquiryResult, error: inquiryError };
      }

      return { result };
    },
  },
};

export default resolvers;
