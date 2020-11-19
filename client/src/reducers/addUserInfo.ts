export const ADD_USER_INFO = 'ADD_USER_INFO';

export interface AddUserInfo {
  type: typeof ADD_USER_INFO;
  test: string;
}

const addUserInfo = (test: string): AddUserInfo => ({ type: ADD_USER_INFO, test });

export default addUserInfo;
