import { Resolvers } from '@type/api';

export const NEW_CHAT = 'NEW_CHAT';

const resolvers: Resolvers = {
  Subscription: {
    subChat: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_CHAT),
    },
  },
};

export default resolvers;
