import { gql } from 'apollo-server-express';
import { connect, disconnect } from './testMongoose';
import client, { UserType } from './testApollo';


import {
  completedOrder,
  newOrderData,
  existOrderId,
  nonExistOrderId,
  unassignedOrderId,
  cancelOrderId,
  startDrivingOrderId
} from './mock.json';

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

const GET_UNASSIGNED_ORDERS = gql`
  query GetUnassignedOrders {
    getUnassignedOrders {
      result
      unassignedOrders {
        _id
        startingPoint {
          address
          coordinates
        }
        destination {
          address
          coordinates
        }
      }
      error
    }
  }
`;

const { query, mutate } = client(UserType.user);
const driverClient = client(UserType.driver);

describe('사용자의 완료된 오더 조회', () => {
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

    expect(error).toEqual(null);
  });

  test('드라이버 운행 시작', async () => {
    const {
      data: {
        startDriving: { result, error },
      },
    } = (await driverClient.mutate({
      mutation: START_DRIVING,
      variables: { orderId: startDrivingOrderId },
    })) as any;

    expect(result).toBe('success');

    expect(error).toEqual(null);
  });

  test('완료된 오더 조회', async () => {
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
    } = (await query({
      query: GET_ORDER,
      variables: {
        orderId: existOrderId,
      },
    })) as any;
    expect(result).toBe('success');
    expect(order._id).toEqual(existOrderId);
    expect(error).toEqual(null);
  });

  test('존재 하지 않는 오더 테스트', async () => {
    const {
      data: {
        getOrderInfo: { result, order, error },
      },
    } = (await query({
      query: GET_ORDER,
      variables: {
        orderId: nonExistOrderId,
      },
    })) as any;
    expect(result).toBe('fail');
    expect(order).toEqual(null);
    expect(error).toBe('해당 오더가 존재하지 않습니다.');
  });

  test('매칭되지 않은 오더 조회 테스트', async () => {
    const {
      data: {
        getUnassignedOrders: { result, unassignedOrders, error },
      },
    } = (await driverClient.query({
      query: GET_UNASSIGNED_ORDERS,
    })) as any;

    expect(result).toBe('success');
    expect(error).toEqual(null);
    expect(unassignedOrders[0]._id).toEqual(unassignedOrderId);
  });

  afterAll(() => {
    disconnect();
  });
});
