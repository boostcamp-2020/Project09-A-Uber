import { gql } from '@apollo/client';

const UPDATE_ORDER_LIST = gql`
  subscription UpdateOrderList {
    updateOrderList {
      result
    }
  }
`;

export default UPDATE_ORDER_LIST;
