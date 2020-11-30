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

export const SUB_APPROVAL_ORDER = gql`
  subscription SubApprovalOrder($orderId: String, $isDriver: Boolean) {
    subApprovalOrder(orderId: $orderId, isDriver: $isDriver) {
      approvalOrderId
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
