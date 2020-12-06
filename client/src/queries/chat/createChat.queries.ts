import { gql } from '@apollo/client';

const CREATE_CHAT = gql`
  mutation CreateChat($content: String!, $chatId: String!) {
    createChat(content: $content, chatId: $chatId) {
      result
      error
    }
  }
`;

export default CREATE_CHAT;
