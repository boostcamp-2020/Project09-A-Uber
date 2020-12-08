import { gql } from 'apollo-server-express';
import { connect, disconnect } from './testMongoose';
import client, { UserType } from './testApollo';

import { activeOrderId } from './mock.json';

const { TEST_USER } = process.env;

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

const { query } = client(UserType.user);
describe('채팅 API 테스트', () => {
  beforeAll(() => {
    connect();
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

    expect(chats.length).toBe(12);

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
