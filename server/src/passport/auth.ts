import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import passport from '@passport/index';
import UserModel from '@models/user';

interface Message {
  message: string;
}

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
const JWT_HEADER = process.env.JWT_HEADER as string;

const EXPIRED = 1000 * 60 * 15;

const loginAuth = (req: Request, res: Response): Promise<any> =>
  new Promise((resolve, reject) => {
    try {
      passport.authenticate('local', async (error, user, { message }: Message) => {
        if (error || !user) return res.status(400).json({ result: 'fail', message });
        const payload = { email: user.email };
        const accessToken = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '14d' });

        const userData = await UserModel.findOne({ email: user.email });
        await UserModel.updateOne({ _id: userData?.get('_id') }, { refreshToken });
        res.cookie(JWT_HEADER, accessToken, {
          httpOnly: true,
          expires: new Date(Date.now() + EXPIRED),
        });
        resolve(userData);
      })(req, res);
    } catch (error) {
      reject(error);
    }
  });

export default loginAuth;
