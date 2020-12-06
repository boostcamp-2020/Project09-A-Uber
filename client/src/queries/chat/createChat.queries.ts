import { gql } from '@apollo/client';

const CREATE_CHAT = gql`
  mutation CreateChat($content: String!, $writer: String!, $createdAt: String!, $chatId: String!) {
    createChat(content: $content, writer: $writer, createdAt: $createdAt, chatId: $chatId) {
      result
      error
    }
  }
`;

export default CREATE_CHAT;
