import { gql } from '@apollo/client';

const GET_CHAT = gql`
  query GetChat($chatId: String!) {
    getChat(chatId: $chatId) {
      result
      chats {
        writer
        content
        createdAt
      }
    }
  }
`;

export default GET_CHAT;
