export const ADD_ORDER_ID = 'ADD_ORDER_ID';

export interface AddOrderId {
  type: typeof ADD_ORDER_ID;
  orderId: string;
}

export const addOrderId = (orderId: string): AddOrderId => ({
  type: ADD_ORDER_ID,
  orderId,
});

export type OrderActions = AddOrderId;
