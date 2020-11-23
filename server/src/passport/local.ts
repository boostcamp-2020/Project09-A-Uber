import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local';

import { isComparedPassword } from '@util/bcrypt';
import { Message } from '@util/server-message';
import UserModel from '@models/user';

const config = { usernameField: 'email', passwordField: 'password' };

const authenticate: VerifyFunction = async (email: string, password: string, done) => {
  try {
    const user = await UserModel.findOne({ email });

    if (!user) return done(null, false, { message: Message.InvalidEmail });
    if (!isComparedPassword(password, user?.get('password'))) {
      return done(null, false, { message: Message.InvalidPassword });
    }

    return done(null, user, { message: Message.SucceedLogin });
  } catch (error) {
    done(error);
  }
};
const local = new LocalStrategy(config, authenticate);

export default local;
