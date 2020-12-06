import { gql } from '@apollo/client';

const LOGOUT = gql`
  mutation Logout {
    logout {
      result
      error
    }
  }
`;

export default LOGOUT;
