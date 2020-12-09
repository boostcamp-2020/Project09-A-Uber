import { gql } from 'apollo-server-express';
import { connect, disconnect } from './testMongoose';
import client, { UserType } from './testApollo';

import { completedOrder, startedDriveOrderId, amount as price } from './mock.json';

const GET_COMPLETED_ORDERS = gql`
  query GetCompletedOrders {
    getCompletedOrders {
      result
      completedOrders {
        _id
        startingPoint {
          coordinates
          address
        }
        destination {
          coordinates
          address
        }
        amount
        startedAt
        completedAt
        driver
      }
      error
    }
  }
`;

const COMPLETE_ORDER = gql`
  mutation CompleteOrder($orderId: String!, $amount: Int!) {
    completeOrder(orderId: $orderId, amount: $amount) {
      result
      error
    }
  }
`;

const { query, mutate } = client(UserType.user);

describe('오더 관련 API 테스트 입니다.', () => {
  beforeAll(() => {
    connect();
  });

  test('완료된 오더 조회', async () => {
    const {
      data: {
        getCompletedOrders: { result, completedOrders, error },
      },
    } = (await query({
      query: GET_COMPLETED_ORDERS,
    })) as any;

    expect(result).toBe('success');

    expect(error).toEqual(null);

    expect(completedOrders[1].amount).toBe(3000);

    expect(completedOrders[0].startingPoint.coordinates.length).toBe(2);

    expect(completedOrders[0].destination.coordinates.length).toBe(2);

    expect(completedOrders[1]).toEqual(completedOrder);
  });

  test('completeOrder API 테스트', async () => {
    const {
      data: { completeOrder },
    } = (await mutate({
      mutation: COMPLETE_ORDER,
      variables: {
        orderId: startedDriveOrderId,
        amount: price,
      },
    })) as any;

    expect(completeOrder.result).toBe('success');
  });

  afterAll(() => {
    disconnect();
  });
});
