import { gql } from '@apollo/client';

const GET_USER_WITH_ORDER = gql`
  query GetUserWithOrder {
    getUserWithOrder {
      result
      user {
        _id
        email
        type
      }
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

export default GET_USER_WITH_ORDER;
