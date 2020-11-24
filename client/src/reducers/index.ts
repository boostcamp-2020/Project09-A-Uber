import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
} from './user';

interface Driver {
  licenseNumber: string;
  status: string;
}

export interface InitialState {
  signUpLoading: boolean;
  signUpDone: boolean;
  signUpError?: string | null;
  user?: {
    _id: string;
    name: string;
    driver?: Driver;
  };
}

const initialState: InitialState = {
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
};

type Action = {
  type: typeof SIGN_UP_REQUEST | typeof SIGN_UP_SUCCESS | typeof SIGN_UP_FAILURE;
  error?: string;
};

const reducer = (state: InitialState = initialState, action: Action): InitialState => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      console.log(action);
      return { ...initialState, signUpLoading: true };
    case SIGN_UP_SUCCESS:
      return { ...initialState, signUpLoading: false };
    case SIGN_UP_FAILURE:
      return { ...initialState, signUpLoading: false, signUpError: action.error };
    default:
      return state;
  }
};

export default reducer;
