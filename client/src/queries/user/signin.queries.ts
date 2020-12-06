import { gql } from '@apollo/client';

const SIGNIN = gql`
  mutation Signin($email: String!, $password: String!, $loginType: String!) {
    signin(email: $email, password: $password, loginType: $loginType) {
      result
      error
    }
  }
`;

export default SIGNIN;
