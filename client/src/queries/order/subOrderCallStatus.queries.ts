import { gql } from '@apollo/client';

const SUB_ORDER_CALL_STATUS = gql`
  subscription SubOrderCallStatus($orderId: String!) {
    subOrderCallStatus(orderId: $orderId) {
      orderId
      status
    }
  }
`;

export default SUB_ORDER_CALL_STATUS;
