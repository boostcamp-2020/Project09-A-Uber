import { Strategy as JWTStrategy, ExtractJwt, VerifyCallback } from 'passport-jwt';
import dotenv from 'dotenv';
import { Message } from '@util/server-message';

import User from '@models/user';

dotenv.config();

const JWTConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

const jwtVerify: VerifyCallback = async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload.id, '_id type');

    if (user) return done(null, user);
    return done(null, false, { message: Message.InvalidToken });
  } catch (err) {
    console.error(err);
    done(err);
  }
};

const jwt = new JWTStrategy(JWTConfig, jwtVerify);

export default jwt;
