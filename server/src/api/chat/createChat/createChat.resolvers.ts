import { Resolvers } from '@type/api';

import insertChat from '@services/chat/createChat';
import { NEW_CHAT } from '@api/chat/subChat/subChat.resolvers';

const resolvers: Resolvers = {
  Mutation: {
    createChat: async (_, { chatId, content }, { req, pubsub }) => {
      const payload = {
        chatId,
        content,
        writer: req.user?._id as string,
      };
      const { result, chat, error } = await insertChat(payload);

      pubsub.publish(NEW_CHAT, { subChat: { result, chat, error, orderId: chatId } });

      if (result === 'fail' || error) return { result, chat, error };

      return { result, chat };
    },
  },
};

export default resolvers;
