import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from './user';

interface Driver {
  licenseNumber: string;
  status: string;
}

export interface InitialState {
  signUpLoading: boolean;
  signUpError?: string | null;
  signInLoading: boolean;
  signInError?: string | null;
  user?: {
    _id: string;
    name: string;
    driver?: Driver;
  };
}

const initialState: InitialState = {
  signUpLoading: false,
  signUpError: null,
  signInLoading: false,
  signInError: null,
};

type Action = {
  type:
    | typeof SIGN_UP_REQUEST
    | typeof SIGN_UP_SUCCESS
    | typeof SIGN_UP_FAILURE
    | typeof SIGN_IN_REQUEST
    | typeof SIGN_IN_SUCCESS
    | typeof SIGN_IN_FAILURE;
  error?: string;
};

const reducer = (state: InitialState = initialState, action: Action): InitialState => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return { ...initialState, signUpLoading: true };
    case SIGN_UP_SUCCESS:
      return { ...initialState, signUpLoading: false };
    case SIGN_UP_FAILURE:
      return { ...initialState, signUpLoading: false, signUpError: action.error };
    case SIGN_IN_REQUEST:
      return { ...initialState, signInLoading: true };
    case SIGN_IN_SUCCESS:
      return { ...initialState, signInLoading: false };
    case SIGN_IN_FAILURE:
      return { ...initialState, signInLoading: false, signInError: action.error };
    default:
      return state;
  }
};

export default reducer;
