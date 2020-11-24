import {
  Strategy as LocalStrategy,
  VerifyFunctionWithRequest,
  IStrategyOptionsWithRequest,
} from 'passport-local';
import { Request } from 'express';

import { isComparedPassword } from '@util/bcrypt';
import { Message } from '@util/server-message';
import UserModel, { LoginType } from '@models/user';

const config: IStrategyOptionsWithRequest = {
  passReqToCallback: true,
  usernameField: 'email',
  passwordField: 'password',
};

const authenticate: VerifyFunctionWithRequest = async (
  req: Request,
  email: string,
  password: string,
  done,
) => {
  try {
    const loginType = req.body.loginType as LoginType;
    const user = await UserModel.findOne({ email, type: loginType });

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
