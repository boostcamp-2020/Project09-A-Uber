import { gql } from '@apollo/client';

const GET_DRIVER_LOCATION = gql`
  query getDriverLocation($orderId: String!) {
    getDriverLocation(orderId: $orderId) {
      result
      driverLocation {
        lat
        lng
      }
      error
    }
  }
`;

export default GET_DRIVER_LOCATION;
