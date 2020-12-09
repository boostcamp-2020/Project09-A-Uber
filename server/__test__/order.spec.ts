import { gql } from 'apollo-server-express';
import { connect, disconnect } from './testMongoose';
import client, { UserType } from './testApollo';

import { completedOrder } from './mock.json';

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

const { query } = client(UserType.user);
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

    expect(completedOrders[1].amount).toBe(3000);

    expect(completedOrders[0].startingPoint.coordinates.length).toBe(2);

    expect(completedOrders[0].destination.coordinates.length).toBe(2);

    expect(completedOrders[1]).toEqual(completedOrder);
  });

  afterAll(() => {
    disconnect();
  });
});
