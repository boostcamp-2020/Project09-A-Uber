import { gql } from 'apollo-server-express';
import { connect, disconnect } from './testMongoose';
import client, { UserType } from './testApollo';

import { completedOrder, newOrderData } from './mock.json';

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

    expect(completedOrders[1].amount).toBe(3000);

    expect(completedOrders[0].startingPoint.coordinates.length).toBe(2);

    expect(completedOrders[0].destination.coordinates.length).toBe(2);

    expect(completedOrders[1]).toEqual(completedOrder);
  });

  test('오더 생성', async () => {
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

  afterAll(() => {
    disconnect();
  });
});
