import { gql } from '@apollo/client';

const helloQuery = gql`
  query HelloQuery {
    hello {
      result
      error
    }
  }
`;

export { helloQuery };
