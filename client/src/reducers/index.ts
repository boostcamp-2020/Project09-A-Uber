import { CarInfo } from '@/types/api';
import { OrderActions, ADD_ORDER_ID, ADD_CAR_INFO, RESET_ORDER } from './order';
import {
  LocationActions,
  UPDATE_LOCATION_ORIGIN,
  UPDATE_LOCATION_DESTINATION,
  UPDATE_LOCATION_ALL,
} from './location';
import { UserAction, ADD_USER_INFO_WITH_ORDER } from './user';

interface Driver {
  licenseNumber: string;
  status: string;
}

export interface Location {
  address?: string;
  lat: number;
  lng: number;
}

export interface User {
  _id: string;
  name: string;
  driver?: Driver;
  type: string;
}

export interface Order {
  _id?: string | null;
  carInfo?: CarInfo;
  location: {
    origin?: Location;
    destination?: Location;
  };
}

export interface InitialState {
  user?: {
    _id: string;
    name: string;
    driver?: Driver;
    type: string;
  };
  order: {
    id?: string | null;
    carInfo?: CarInfo;
    location: {
      isFixCenter: boolean;
      origin?: Location;
      destination?: Location;
    };
  };
}

const initialState: InitialState = { order: { location: { isFixCenter: false } } };

type Action = OrderActions | LocationActions | UserAction;

const reducer = (state: InitialState = initialState, action: Action): InitialState => {
  switch (action.type) {
    // order
    case ADD_ORDER_ID:
      return { ...state, order: { ...state.order, id: action.orderId } };
    case ADD_CAR_INFO:
      return { ...state, order: { ...state.order, carInfo: action.carInfo } };
    case RESET_ORDER:
      return { ...state, order: { location: { isFixCenter: false } } };

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
    case UPDATE_LOCATION_ALL:
      return {
        ...state,
        order: {
          ...state.order,
          location: {
            ...state.order.location,
            origin: action.origin,
            destination: action.destination,
          },
        },
      };
    case ADD_USER_INFO_WITH_ORDER: {
      const order = action.order
        ? {
            ...state.order,
            id: action.order._id,
            location: {
              ...state.order.location,
              origin: action.order.location.origin,
              destination: action.order.location.destination,
            },
          }
        : state.order;

      return {
        ...state,
        user: action.user,
        order,
      };
    }
    default:
      return state;
  }
};

export default reducer;
