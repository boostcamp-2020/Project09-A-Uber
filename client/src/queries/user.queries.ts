import { gql } from '@apollo/client';

export const GET_USER_INFO = gql`
  query GetUserInfo {
    getUserInfo {
      user {
        email
      }
      error
    }
  }
`;

export const SIGNIN = gql`
  mutation Signin($email: String!, $password: String!, $loginType: String!) {
    signin(email: $email, password: $password, loginType: $loginType) {
      result
      error
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation SignupUser(
    $name: String!
    $email: String!
    $password: String!
    $phone: String!
    $payment: PaymentInfo!
  ) {
    signupUser(name: $name, email: $email, password: $password, phone: $phone, payment: $payment) {
      result
      error
    }
  }
`;

export const SIGNUP_DRIVER = gql`
  mutation SignupDriver(
    $name: String!
    $email: String!
    $password: String!
    $phone: String!
    $driver: DriverInfo!
  ) {
    signupDriver(name: $name, email: $email, password: $password, phone: $phone, driver: $driver) {
      result
      error
    }
  }
`;
