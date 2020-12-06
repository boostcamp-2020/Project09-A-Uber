import { gql } from '@apollo/client';

const REQUEST_TOKEN = gql`
  mutation RequestToken {
    requestToken {
      result
      message
    }
  }
`;

export default REQUEST_TOKEN;
