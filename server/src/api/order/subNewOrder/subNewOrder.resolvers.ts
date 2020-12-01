import { Resolvers } from '@type/api';
import { CREATE_NEW_ORDER } from '@api/order/createOrder/createOrder.resolvers';

const resolvers: Resolvers = {
  Subscription: {
    subNewOrder: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(CREATE_NEW_ORDER),
    },
  },
};

export default resolvers;
