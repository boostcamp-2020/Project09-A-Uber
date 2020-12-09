import { gql } from 'apollo-server-express';
import { connect, disconnect } from './testMongoose';
import client, { UserType } from './testApollo';

import { completedOrder, newOrderData, existOrderId, nonExistOrderId } from './mock.json';

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

const CREATE_ORDER = gql`
  mutation CreateOrder($startingPoint: LocationInfo!, $destination: LocationInfo!) {
    createOrder(startingPoint: $startingPoint, destination: $destination) {
      result
      orderId
      error
    }
  }
`;

const GET_ORDER = gql`
  query GetOrderInfo($orderId: String!) {
    getOrderInfo(orderId: $orderId) {
      result
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

const { query, mutate } = client(UserType.user);
describe('사용자 오더 테스트', () => {
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

  test('오더 생성 테스트', async () => {
    const {
      data: {
        createOrder: { result, error },
      },
    } = (await mutate({
      mutation: CREATE_ORDER,
      variables: newOrderData,
    })) as any;

    expect(result).toBe('success');
    expect(error).toEqual(null);
  });

  test('오더 조회 테스트', async () => {
    const {
      data: {
        getOrderInfo: { result, order, error },
      },
    } = await query({
      query: GET_ORDER,
      variables: {
        orderId: existOrderId,
      },
    });
    expect(result).toBe('success');
    expect(order._id).toEqual(existOrderId);
    expect(error).toEqual(null);
  });

  test('존재 하지 않는 오더 테스트', async () => {
    const {
      data: {
        getOrderInfo: { result, order, error },
      },
    } = await query({
      query: GET_ORDER,
      variables: {
        orderId: nonExistOrderId,
      },
    });
    expect(result).toBe('fail');
    expect(order).toEqual(null);
    expect(error).toBe('해당 오더가 존재하지 않습니다.');
  });

  afterAll(() => {
    disconnect();
  });
});
