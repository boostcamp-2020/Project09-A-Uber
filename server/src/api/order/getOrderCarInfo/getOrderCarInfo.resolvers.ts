import { Resolvers } from '@type/api';

import getOrderCarInfo from '@services/order/getOrderCarInfo';

const resolvers: Resolvers = {
  Query: {
    getOrderCarInfo: async (_, { orderId }, { req }) => {
      const { result, carInfo, error } = await getOrderCarInfo(req.user?._id || '', orderId);

      if (result === 'fail' || error) {
        return { result, error };
      }

      return { result, carInfo };
    },
  },
};

export default resolvers;
