import { gql } from '@apollo/client';

export const CREATE_CHAT = gql`
  mutation CreateChat($content: String!, $writer: String!, $createdAt: String!, $chatId: String!) {
    createChat(content: $content, writer: $writer, createdAt: $createdAt, chatId: $chatId) {
      result
      error
    }
  }
`;

export const GET_CHAT = gql`
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

export const SUB_CHAT = gql`
  subscription SubChat {
    subChat {
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
