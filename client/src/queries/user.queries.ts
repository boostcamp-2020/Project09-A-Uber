import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation signinDriver($email: String!, $password: String!, $loginType: String!) {
    signIn(email: $email, password: $password, loginType: $loginType) {
      result
      error
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation SignupUser(
    $name: String!
    $email: String!
    $password: String!
    $phone: String!
    $payment: Object!
  ) {
    signupUser(name: $name, email: $email, password: $password, phone: $phone, payment: $payment) {
      result
      error
    }
  }
`;

export const SIGNIN_DRIVER = gql`
  mutation SignupDriver(
    $name: String!
    $email: String!
    $password: String!
    $phone: String!
    $driver: Object!
  ) {
    signupDriver(name: $name, email: $email, password: $password, phone: $phone, driver: $driver) {
      result
      error
    }
  }
`;
