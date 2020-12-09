import { gql } from 'apollo-server-express';
import { connect, disconnect } from './testMongoose';
import client, { UserType } from './testApollo';
import {
  completedOrder,
  startedDriveOrderId,
  waitingOrderId,
  amount as price,
  testUser,
} from './mock.json';

const { query, mutate } = client(UserType.user);

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

const GET_ORDER_BY_ID = gql`
  query getOrderById($orderId: String!) {
    getOrderById(orderId: $orderId) {
      result
      order {
        status
        amount
        startedAt
        completedAt
        driver
      }
      error
    }
  }
`;

const GET_USER_WITH_ORDER = gql`
  query GetUserWithOrder {
    getUserWithOrder {
      result
      user {
        _id
        email
        type
      }
      order {
        _id
        startingPoint {
          address
          coordinates
        }
        destination {
          address
          coordinates
        }
        status
      }
      error
    }
  }
`;

describe('오더 관련 API 테스트 입니다.', () => {
  beforeAll(() => {
    connect();
  });

  test('getUserWithOrder API 테스트', async () => {
    const {
      data: { getUserWithOrder },
    } = (await query({ query: GET_USER_WITH_ORDER })) as any;

    expect(getUserWithOrder.result).toBe('success');

    expect(getUserWithOrder.user._id).toBe(testUser);

    expect(getUserWithOrder.user.type).toBe('user');

    expect(getUserWithOrder.order._id).toBe(waitingOrderId);
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

    const {
      data: { getOrderById },
    } = (await query({
      query: GET_ORDER_BY_ID,
      variables: { orderId: waitingOrderId },
    })) as any;

    expect(approvalOrder.result).toBe('success');

    expect(getOrderById.result).toBe('success');

    expect(getOrderById.order.status).toBe('approval');
  });

  afterAll(() => {
    disconnect();
  });
});
