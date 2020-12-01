import { Resolvers } from '@type/api';
import { withFilter } from 'apollo-server-express';

export const NEW_CHAT = 'NEW_CHAT';

const resolvers: Resolvers = {
  Subscription: {
    subChat: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator(NEW_CHAT),
        (payload, variables) => {
          return payload.subChat.orderId === variables.orderId;
        },
      ),
    },
  },
};

export default resolvers;
