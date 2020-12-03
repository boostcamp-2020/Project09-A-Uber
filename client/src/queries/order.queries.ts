import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
  mutation CreateOrder($startingPoint: LocationInfo!, $destination: LocationInfo!) {
    createOrder(startingPoint: $startingPoint, destination: $destination) {
      result
      orderId
      error
    }
  }
`;

export const GET_ORDER = gql`
  query GetOrderInfo($orderId: String!) {
    getOrderInfo(orderId: $orderId) {
      result
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

export const GET_ORDER_BY_ID = gql`
  query getOrderById($orderId: String!) {
    getOrderById(orderId: $orderId) {
      result
      order {
        status
      }
      error
    }
  }
`;

export const GET_UNASSIGNED_ORDERS = gql`
  query GetUnassignedOrders {
    getUnassignedOrders {
      result
      unassignedOrders {
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
      error
    }
  }
`;

export const APPROVAL_ORDER = gql`
  mutation ApprovalOrder($orderId: String!) {
    approvalOrder(orderId: $orderId) {
      result
      error
    }
  }
`;

export const SUB_ORDER_CALL_STATUS = gql`
  subscription SubOrderCallStatus($orderId: String!) {
    subOrderCallStatus(orderId: $orderId) {
      orderId
      status
    }
  }
`;

export const GET_ORDER_CAR_INFO = gql`
  query GetOrderCarInfo($orderId: String!) {
    getOrderCarInfo(orderId: $orderId) {
      result
      error
      carInfo {
        carNumber
        carType
      }
    }
  }
`;

export const UPDATE_ORDER_LIST = gql`
  subscription UpdateOrderList {
    updateOrderList {
      result
    }
  }
`;

export const SUB_NEW_ORDER = gql`
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

export const CANCEL_ORDER = gql`
  mutation CancelOrder($orderId: String!) {
    cancelOrder(orderId: $orderId) {
      result
      error
    }
  }
`;

export const START_DRIVING = gql`
  mutation StartDriving($orderId: String!) {
    startDriving(orderId: $orderId) {
      result
      error
    }
  }
`;

export const COMPLETE_ORDER = gql`
  mutation CompleteOrder($orderId: String!) {
    completeOrder(orderId: $orderId) {
      result
      error
    }
  }
`;
