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
  order?: {
    id?: string;
  };
}

const initialState: InitialState = {};

type Action = OrderActions;

const reducer = (state: InitialState = initialState, action: Action): InitialState => {
  switch (action.type) {
    case ADD_ORDER_ID:
      return { ...state, order: { ...state.order, id: action.orderId } };
    default:
      return state;
  }
};

export default reducer;
