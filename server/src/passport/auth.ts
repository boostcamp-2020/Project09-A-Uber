import jwt from 'jsonwebtoken';

import passport from '@passport/index';
import { ExpressFunction } from '@type/ExpressFunction';
import UserModel from '@models/user';

interface Message {
  message: string;
}

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

const loginAuth: ExpressFunction = async (req, res, next) => {
  try {
    passport.authenticate('local', async (error, user, { message }: Message) => {
      if (error || !user) return res.status(400).json({ result: 'fail', message });

      const payload = { email: user.email };
      const accessToken = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '15m' });
      const refreshToken = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '14d' });

      const userData = await UserModel.findOne({ email: user.email });
      await UserModel.updateOne({ _id: userData?.get('_id') }, { refreshToken });

      res.status(200).json({ result: 'success', accessToken });
    })(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default loginAuth;
