import { gql } from '@apollo/client';

export const REQUEST_TOKEN = gql`
  mutation RequestToken {
    requestToken {
      result
      message
    }
  }
`;
