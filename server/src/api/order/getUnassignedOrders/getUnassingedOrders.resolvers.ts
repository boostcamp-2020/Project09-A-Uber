import { Resolvers } from '@type/api';

import getUnassignedOrders from '@services/order/getUnassingedOrders';

const resolvers: Resolvers = {
  Query: {
    getUnassignedOrders: async (_, __, { req }) => {
      const { result, unassignedOrders, error } = await getUnassignedOrders(req.user?.id || '');

      if (!unassignedOrders && (result === 'fail' || error)) {
        return { result, error };
      }

      return { result, unassignedOrders };
    },
  },
};

export default resolvers;
