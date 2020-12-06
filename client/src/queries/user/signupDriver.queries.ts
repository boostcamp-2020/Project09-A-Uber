import { gql } from '@apollo/client';

const SIGNUP_DRIVER = gql`
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

export default SIGNUP_DRIVER;
