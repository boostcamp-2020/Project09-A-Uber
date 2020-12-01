import { Resolvers } from '@type/api';

import insertChat from '@services/chat/createChat';

const resolvers: Resolvers = {
  Mutation: {
    createChat: async (_, { chatId, content, writer, createdAt }) => {
      const payload = {
        chatId,
        content,
        writer,
        createdAt,
      };
      const { result, chat, error } = await insertChat(payload);

      if (result === 'fail' || error) return { result, chat, error };

      return { result, chat };
    },
  },
};

export default resolvers;
