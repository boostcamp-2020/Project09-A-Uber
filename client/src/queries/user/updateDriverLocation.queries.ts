import { gql } from '@apollo/client';

const UPDATE_DRIVER_LOCATION = gql`
  mutation UpdateDriverLocation($lat: Float!, $lng: Float!) {
    updateDriverLocation(lat: $lat, lng: $lng) {
      result
    }
  }
`;

export default UPDATE_DRIVER_LOCATION;
