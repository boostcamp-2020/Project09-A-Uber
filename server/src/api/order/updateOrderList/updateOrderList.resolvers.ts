import { Resolvers } from '@type/api';

export const UPDATE_ORDER_LIST = 'UPDATE_ORDER_LIST';

const resolvers: Resolvers = {
  Subscription: {
    updateOrderList: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(UPDATE_ORDER_LIST),
    },
  },
};

export default resolvers;
