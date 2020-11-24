import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from './user';

interface Driver {
  licenseNumber: string;
  status: string;
}

export interface InitialState {
  signup: {
    loading: boolean;
    result?: boolean;
    error?: string;
  };
  user?: {
    _id: string;
    name: string;
    driver?: Driver;
  };
}

const initialState: InitialState = {
  signup: {
    loading: false,
  },
};

type Action = {
  type: typeof SIGN_UP_REQUEST | typeof SIGN_UP_SUCCESS | typeof SIGN_UP_FAILURE;
  error?: string;
};

const reducer = (state: InitialState = initialState, action: Action): InitialState => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return { ...state, signup: { loading: true } };
    case SIGN_UP_SUCCESS:
      return { ...state, signup: { loading: false, result: true } };
    case SIGN_UP_FAILURE:
      return { ...state, signup: { loading: false, result: false, error: action.error } };
    default:
      return state;
  }
};

export default reducer;
