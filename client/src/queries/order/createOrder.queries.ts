import { gql } from '@apollo/client';

const CREATE_ORDER = gql`
  mutation CreateOrder($startingPoint: LocationInfo!, $destination: LocationInfo!) {
    createOrder(startingPoint: $startingPoint, destination: $destination) {
      result
      orderId
      error
    }
  }
`;

export default CREATE_ORDER;
