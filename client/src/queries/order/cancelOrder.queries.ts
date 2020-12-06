import { gql } from '@apollo/client';

const CANCEL_ORDER = gql`
  mutation CancelOrder($orderId: String!) {
    cancelOrder(orderId: $orderId) {
      result
      error
    }
  }
`;

export default CANCEL_ORDER;
