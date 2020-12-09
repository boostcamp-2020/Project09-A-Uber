import { gql } from 'apollo-server-express';
import { connect, disconnect } from './testMongoose';
import client, { UserType } from './testApollo';

const UPDATE_DRIVER_LOCATION = gql`
  mutation UpdateDriverLocation($lat: Float!, $lng: Float!) {
    updateDriverLocation(lat: $lat, lng: $lng) {
      result
    }
  }
`;

const { mutate } = client(UserType.driver);

describe('유저 API 테스트', () => {
  beforeAll(() => {
    connect();
  });

  test('드라이버 위치 업데이트 API 테스트', async () => {
    const {
      data: {
        updateDriverLocation: { result },
      },
      errors,
    } = await mutate({
      mutation: UPDATE_DRIVER_LOCATION,
      variables: { lat: 51.50785, lng: -0.127757 },
    });

    expect(result).toBe('success');

    expect(errors).toEqual(undefined);
  });

  afterAll(() => {
    disconnect();
  });
});
