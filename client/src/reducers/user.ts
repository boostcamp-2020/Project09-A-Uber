import { User, Order } from '.';

export const ADD_USER_INFO_WITH_ORDER = 'ADD_USER_INFO_WITH_ORDER';

// addUserInfoWithUser
export interface AddUserInfoWithOrder {
  type: typeof ADD_USER_INFO_WITH_ORDER;
  user: User;
  order: Order | null;
}

export const AddUserInfoWithOrder = (user: User, order: Order | null): AddUserInfoWithOrder => ({
  type: ADD_USER_INFO_WITH_ORDER,
  user,
  order,
});

export type UserAction = AddUserInfoWithOrder;
