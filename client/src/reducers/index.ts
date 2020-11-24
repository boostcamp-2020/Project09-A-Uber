import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from './user';

export interface InitialState {
  signin: {
    loading: boolean;
    result?: boolean;
    error?: string;
  };
}

const initialState: InitialState = {
  signin: {
    loading: false,
  },
};

type Action = {
  type: typeof SIGN_IN_REQUEST | typeof SIGN_IN_SUCCESS | typeof SIGN_IN_FAILURE;
  error?: string;
};

const reducer = (state: InitialState = initialState, action: Action): InitialState => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return { ...state, signin: { loading: true } };
    case SIGN_IN_SUCCESS:
      return { ...state, signin: { loading: false, result: true } };
    case SIGN_IN_FAILURE:
      return { ...state, signin: { loading: false, error: action.error } };
    default:
      return state;
  }
};

export default reducer;
