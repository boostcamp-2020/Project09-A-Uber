import { gql } from '@apollo/client';

const SIGNUP_USER = gql`
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

export default SIGNUP_USER;
