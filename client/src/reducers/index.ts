import { CarInfo } from '@/types/api';
import { OrderActions, ADD_ORDER_ID, ADD_CAR_INFO } from './order';

interface Driver {
  licenseNumber: string;
  status: string;
}

export interface Location {
  address?: string;
  lat: number;
  lng: number;
}

export interface InitialState {
  user?: {
    _id: string;
    name: string;
    driver?: Driver;
  };
  order?: {
    id?: string;
    carInfo?: CarInfo;
  };
  location: {
    isFixCenter: boolean;
    origin?: Location;
    destination?: Location;
  };
}

const initialState: InitialState = { location: { isFixCenter: false } };

type Action = OrderActions;

const reducer = (state: InitialState = initialState, action: Action): InitialState => {
  switch (action.type) {
    case ADD_ORDER_ID:
      return { ...state, order: { ...state.order, id: action.orderId } };
    case ADD_CAR_INFO:
      return { ...state, order: { ...state.order, carInfo: action.carInfo } };
    default:
      return state;
  }
};

export default reducer;
