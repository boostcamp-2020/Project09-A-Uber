import { ADD_USER_INFO, AddUserInfo } from './addUserInfo';

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
}

const initialState: InitialState = {};

type Action = AddUserInfo;

const reducer = (state: InitialState = initialState, action: Action) => {
  switch (action.type) {
    case ADD_USER_INFO:
      return state;
    default:
      return state;
  }
};

export default reducer;
