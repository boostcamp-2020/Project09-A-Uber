import { gql } from 'apollo-server-express';
import { connect, disconnect } from './testMongoose';
import client, { UserType } from './testApollo';

import { completedOrder, cancelOrderId, startDrivingOrderId } from './mock.json';

const CANCEL_ORDER = gql`
  mutation CancelOrder($orderId: String!) {
    cancelOrder(orderId: $orderId) {
      result
      error
    }
  }
`;

const START_DRIVING = gql`
  mutation StartDriving($orderId: String!) {
    startDriving(orderId: $orderId) {
      result
      error
    }
  }
`;

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

const { query, mutate } = client(UserType.user);
describe('사용자의 완료된 오더 조회', () => {
  beforeAll(() => {
    connect();
  });

  test('오더 취소', async () => {
    const {
      data: {
        cancelOrder: { result, error },
      },
    } = (await mutate({
      mutation: CANCEL_ORDER,
      variables: { orderId: cancelOrderId },
    })) as any;

    expect(result).toBe('success');

    expect(error).toBe(null);
  });

  test('드라이버 운행 시작', async () => {
    const {
      data: {
        startDriving: { result, error },
      },
    } = (await mutate({
      mutation: START_DRIVING,
      variables: { orderId: startDrivingOrderId },
    })) as any;

    expect(result).toBe('success');

    expect(error).toBe(null);
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

  afterAll(() => {
    disconnect();
  });
});
