import { CarInfo } from '@/types/api';

export const ADD_ORDER_ID = 'ADD_ORDER_ID';
export const ADD_CAR_INFO = 'ADD_CAR_INFO';
export const RESET_ORDER = 'RESET_ORDER';

// addOrderID
export interface AddOrderId {
  type: typeof ADD_ORDER_ID;
  orderId: string;
}

export const addOrderId = (orderId: string): AddOrderId => ({
  type: ADD_ORDER_ID,
  orderId,
});

// addCarInfo
export interface AddCarInfo {
  type: typeof ADD_CAR_INFO;
  carInfo: CarInfo;
}

export const addCarInfo = (carInfo: CarInfo): AddCarInfo => ({
  type: ADD_CAR_INFO,
  carInfo,
});

// resetOrder
export interface ResetOrder {
  type: typeof RESET_ORDER;
}

export const resetOrder = (): ResetOrder => ({
  type: RESET_ORDER,
});

export type OrderActions = AddOrderId | AddCarInfo | ResetOrder;
