import { gql } from 'apollo-server-express';
import { connect, disconnect } from './testMongoose';
import client, { UserType } from './testApollo';

import { activeOrderId, createChatId } from './mock.json';

const { TEST_USER } = process.env;

const CREATE_CHAT = gql`
  mutation CreateChat($content: String!, $chatId: String!) {
    createChat(content: $content, chatId: $chatId) {
      result
      error
    }
  }
`;

const GET_CHATS = gql`
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

const { query, mutate } = client(UserType.user);
describe('채팅 API 테스트', () => {
  beforeAll(() => {
    connect();
  });

  test('채팅 메시지 생성', async () => {
    const {
      data: {
        createChat: { result, error },
      },
    } = (await mutate({
      mutation: CREATE_CHAT,
      variables: { chatId: createChatId, content: 'some content' },
    })) as any;

    expect(result).toBe('success');

    expect(error).toEqual(null);
  });

  test('채팅 목록 조회', async () => {
    const {
      data: {
        getChat: { result, chats, error },
      },
    } = (await query({
      query: GET_CHATS,
      variables: { chatId: activeOrderId },
    })) as any;

    expect(result).toBe('success');

    expect(chats.length).toBe(13);

    expect(error).toEqual(undefined);

    expect(chats[0].writer).toBe(TEST_USER);
  });

  test('잘못된 채팅 목록 조회', async () => {
    const { data, errors } = (await query({
      query: GET_CHATS,
      variables: { chatId: '123' },
    })) as any;

    expect(data).toBe(null);

    expect(Boolean(errors)).toBeTruthy();
  });

  afterAll(() => {
    disconnect();
  });
});
