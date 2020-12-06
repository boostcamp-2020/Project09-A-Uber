import { gql } from '@apollo/client';

const GET_ORDER_BY_ID = gql`
  query getOrderById($orderId: String!) {
    getOrderById(orderId: $orderId) {
      result
      order {
        status
        amount
        startedAt
        completedAt
        driver
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

export default GET_ORDER_BY_ID;
