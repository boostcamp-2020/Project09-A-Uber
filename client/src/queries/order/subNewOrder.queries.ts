import { gql } from '@apollo/client';

const SUB_NEW_ORDER = gql`
  subscription SubNewOrder($lat: Float!, $lng: Float!) {
    subNewOrder(lat: $lat, lng: $lng) {
      newOrder {
        _id
        startingPoint {
          address
          coordinates
        }
        destination {
          address
          coordinates
        }
      }
    }
  }
`;

export default SUB_NEW_ORDER;
