import { GraphQLLocalStrategy } from 'graphql-passport';
import { isComparedPassword } from '@util/bcrypt';
import { Message } from '@util/server-message';
import UserModel, { LoginType } from '@models/user';
import { Request } from 'express';

type Authenticate = (
  req: Request,
  username: string,
  password: string,
  done: (error: Error | null, user?: any, options?: { message?: string }) => void,
) => void;

const authenticate: Authenticate = async (req, email = '', password = '', done) => {
  try {
    const loginType = req.body.variables.loginType as LoginType;
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
const local = new GraphQLLocalStrategy({ passReqToCallback: true }, authenticate as any);

export default local;
