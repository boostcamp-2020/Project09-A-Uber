import { gql } from '@apollo/client';

const SUB_DRIVER_LOCATION = gql`
  subscription SubDriverLocation($orderId: String!) {
    subDriverLocation(orderId: $orderId) {
      coordinates
    }
  }
`;

export default SUB_DRIVER_LOCATION;
