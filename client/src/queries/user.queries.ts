import { gql } from '@apollo/client';

export const GET_USER_WITH_ORDER = gql`
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

export const GET_DRIVER_LOCATION = gql`
  query getDriverLocation($orderId: String!) {
    getDriverLocation(orderId: $orderId) {
      result
      driverLocation {
        lat
        lng
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

export const UPDATE_DRIVER_LOCATION = gql`
  mutation UpdateDriverLocation($lat: Float!, $lng: Float!) {
    updateDriverLocation(lat: $lat, lng: $lng) {
      result
    }
  }
`;

export const SUB_DRIVER_LOCATION = gql`
  subscription SubDriverLocation($orderId: String!) {
    subDriverLocation(orderId: $orderId) {
      coordinates
    }
  }
`;
