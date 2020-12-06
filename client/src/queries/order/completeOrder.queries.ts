import { gql } from '@apollo/client';

export const COMPLETE_ORDER = gql`
  mutation CompleteOrder($orderId: String!, $amount: Int!) {
    completeOrder(orderId: $orderId, amount: $amount) {
      result
      error
    }
  }
`;

export default COMPLETE_ORDER;
