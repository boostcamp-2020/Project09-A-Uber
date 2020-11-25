import User, { loginType } from '@models/user';
import { encryptPassword } from '@util/bcrypt';

import { SignupResponse } from '@type/api';

interface CreateUserProps {
  name: string;
  email: string;
  password: string;
  phone: string;
  payment: {
    bank: string;
    creditNumber: string;
    expiryDate: string;
    cvc: number;
  };
}

const createUser = async ({
  name,
  email,
  password,
  phone,
  payment,
}: CreateUserProps): Promise<SignupResponse> => {
  try {
    await User.create({
      name,
      email,
      password: encryptPassword(password),
      phone,
      payment,
      type: loginType.user,
    });

    return { result: 'success' };
  } catch (err) {
    return { result: 'fail', error: err.message };
  }
};

export default createUser;
