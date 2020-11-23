import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local';
import { isComparedPassword } from '@util/bcrypt';
import { Message } from '@util/server-message';

const config = { usernameField: 'email', passwordField: 'password' };
const mock = {
  email: 'gildong@test.com',
  password: '$2b$10$UzWKr4Em04s.UVjHZf1fHe8rc39voVNMuUhVCW7KP.tc0vrbmNW.K',
};

const authenticate: VerifyFunction = async (email: string, password: string, done) => {
  try {
    if (mock.email !== email) return done(null, false, { message: Message.InvaildEmail });
    if (!isComparedPassword(password, mock.password)) {
      return done(null, false, { message: Message.IvaildPassword });
    }

    return done(null, mock, { message: Message.SucceedLogin });
  } catch (error) {
    done(error);
  }
};
const local = new LocalStrategy(config, authenticate);

export default local;
