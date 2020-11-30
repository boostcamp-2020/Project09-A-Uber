import { Resolvers } from '@type/api';

import getChatList from '@services/chat/getChat';

const resolvers: Resolvers = {
  Query: {
    getChat: async (_, { chatId }) => {
      const { result, chat, error } = await getChatList(chatId);

      if (result === 'fail' || error) {
        return { result, error };
      }

      return { result, chat };
    },
  },
};

export default resolvers;
