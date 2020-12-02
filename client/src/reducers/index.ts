import { CarInfo } from '@/types/api';
import { OrderActions, ADD_ORDER_ID, ADD_CAR_INFO } from './order';
import { LocationActions, UPDATE_LOCATION_ORIGIN, UPDATE_LOCATION_DESTINATION } from './location';

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
  order: {
    id?: string;
    carInfo?: CarInfo;
    location: {
      isFixCenter: boolean;
      origin?: Location;
      destination?: Location;
    };
  };
}

const initialState: InitialState = { order: { location: { isFixCenter: false } } };

type Action = OrderActions | LocationActions;

const reducer = (state: InitialState = initialState, action: Action): InitialState => {
  switch (action.type) {
    // order
    case ADD_ORDER_ID:
      return { ...state, order: { ...state.order, id: action.orderId } };
    case ADD_CAR_INFO:
      return { ...state, order: { ...state.order, carInfo: action.carInfo } };

    // location
    case UPDATE_LOCATION_ORIGIN:
      return {
        ...state,
        order: {
          ...state.order,
          location: {
            ...state.order.location,
            origin: action.location,
          },
        },
      };
    case UPDATE_LOCATION_DESTINATION:
      return {
        ...state,
        order: {
          ...state.order,
          location: {
            ...state.order.location,
            destination: action.location,
          },
        },
      };

    default:
      return state;
  }
};

export default reducer;
