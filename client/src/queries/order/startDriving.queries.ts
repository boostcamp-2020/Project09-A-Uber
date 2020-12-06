import { gql } from '@apollo/client';

const START_DRIVING = gql`
  mutation StartDriving($orderId: String!) {
    startDriving(orderId: $orderId) {
      result
      error
    }
  }
`;

export default START_DRIVING;
