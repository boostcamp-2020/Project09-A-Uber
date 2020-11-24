import User, { loginType } from '@models/user';
import { encryptPassword } from '@util/bcrypt';

import { ServiceReturn } from '@type/service';

interface CreateUserProps {
  name: string;
  email: string;
  password: string;
  phone: string;
  driver: {
    licenseNumber: string;
    car: {
      carNumber: string;
      carType: 'small' | 'middle' | 'large';
    };
  };
}

const createUser = async ({
  name,
  email,
  password,
  phone,
  driver,
}: CreateUserProps): Promise<ServiceReturn> => {
  try {
    await User.create({
      name,
      email,
      password: encryptPassword(password),
      phone,
      driver,
      type: loginType.driver,
    });

    return { result: 'success' };
  } catch (err) {
    return { result: 'fail', message: err.message };
  }
};

export default createUser;
