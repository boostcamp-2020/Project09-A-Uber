import { gql } from '@apollo/client';

const GET_UNASSIGNED_ORDERS = gql`
  query GetUnassignedOrders {
    getUnassignedOrders {
      result
      unassignedOrders {
        _id
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

export default GET_UNASSIGNED_ORDERS;
