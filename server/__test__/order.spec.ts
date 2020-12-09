import { gql } from 'apollo-server-express';
import { connect, disconnect } from './testMongoose';
import client, { UserType } from './testApollo';
import {
  completedOrder,
  newOrderData,
  existOrderId,
  nonExistOrderId,
  cancelOrderId,
  startedDriveOrderId,
  waitingOrderId,
  amount as price,
  testUser,
} from './mock.json';

const { query, mutate } = client(UserType.user);
const driverClient = client(UserType.driver);

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
        status
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

const GET_ORDER_BY_ID = gql`
  query getOrderById($orderId: String!) {
    getOrderById(orderId: $orderId) {
      result
      order {
        _id
        startingPoint {
          coordinates
          address
        }
        destination {
          coordinates
          address
        }
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

const APPROVAL_ORDER = gql`
  mutation ApprovalOrder($orderId: String!) {
    approvalOrder(orderId: $orderId) {
      result
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

describe('오더 관련 API 테스트 입니다.', () => {
  beforeAll(() => {
    connect();
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
      variables: { orderId: waitingOrderId },
    })) as any;

    expect(result).toBe('success');

    expect(error).toEqual(null);
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

    expect(unassignedOrders.length).toBe(2);
  });

  test('아이디를 통한 오더 조회', async () => {
    const {
      data: {
        getOrderById: { result, error, order },
      },
    } = await query({
      query: GET_ORDER_BY_ID,
      variables: { orderId: completedOrder._id },
    });

    expect(result).toBe('success');

    expect(error).toEqual(null);

    expect(order).toEqual(completedOrder);
  });

  afterAll(() => {
    disconnect();
  });
});
