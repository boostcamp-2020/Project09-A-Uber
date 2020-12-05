import { gql } from '@apollo/client';

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

export default GET_ORDER;
