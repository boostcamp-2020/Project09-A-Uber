import { gql } from '@apollo/client';

const SUB_CHAT = gql`
  subscription SubChat($chatId: String!) {
    subChat(orderId: $chatId) {
      result
      error
      chat {
        createdAt
        writer
        content
      }
    }
  }
`;

export default SUB_CHAT;
