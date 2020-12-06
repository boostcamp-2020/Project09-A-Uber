import { gql } from '@apollo/client';

const GET_ORDER_CAR_INFO = gql`
  query GetOrderCarInfo($orderId: String!) {
    getOrderCarInfo(orderId: $orderId) {
      result
      error
      carInfo {
        carNumber
        carType
      }
    }
  }
`;

export default GET_ORDER_CAR_INFO;
