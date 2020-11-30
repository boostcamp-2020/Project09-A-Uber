import { CarInfo } from '@/types/api';

export const ADD_ORDER_ID = 'ADD_ORDER_ID';
export const ADD_CAR_INFO = 'ADD_CAR_INFO';

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

export type OrderActions = AddOrderId | AddCarInfo;
