import { OrderActions, ADD_ORDER_ID } from './order';

interface Driver {
  licenseNumber: string;
  status: string;
}

export interface InitialState {
  user?: {
    _id: string;
    name: string;
    driver?: Driver;
  };
  orderId?: string;
}

const initialState: InitialState = {};

type Action = OrderActions;

const reducer = (state: InitialState = initialState, action: Action): InitialState => {
  switch (action.type) {
    case ADD_ORDER_ID:
      return { ...state, orderId: action.orderId };
    default:
      return state;
  }
};

export default reducer;
