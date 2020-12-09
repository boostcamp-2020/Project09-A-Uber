import { gql } from 'apollo-server-express';
import { connect, disconnect } from './testMongoose';
import client, { UserType } from './testApollo';

import { completedOrder, startedDriveOrderId, waitingOrderId, amount as price } from './mock.json';

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

const APPROVAL_ORDER = gql`
  mutation ApprovalOrder($orderId: String!) {
    approvalOrder(orderId: $orderId) {
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

    expect(completedOrders[0].amount).toBe(3000);

    expect(completedOrders[1].startingPoint.coordinates.length).toBe(2);

    expect(completedOrders[1].destination.coordinates.length).toBe(2);

    expect(completedOrders[0]).toEqual(completedOrder);
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

    const {
      data: {
        getCompletedOrders: { completedOrders },
      },
    } = (await query({
      query: GET_COMPLETED_ORDERS,
    })) as any;

    expect(completeOrder.result).toBe('success');

    expect(completedOrders[0]._id).toBe(startedDriveOrderId);

    expect(completedOrders[0].amount).toBe(price);
  });

  test('approvalOrder API 테스트', async () => {
    const {
      data: { approvalOrder },
    } = (await mutate({
      mutation: APPROVAL_ORDER,
      variables: { orderId: waitingOrderId },
    })) as any;

    expect(approvalOrder.result).toBe('success');
  });

  afterAll(() => {
    disconnect();
  });
});
