import passport from '@passport/index';
import jwt from 'jsonwebtoken';
import { ExpressFunction } from '@type/ExpressFunction';

interface Message {
  message: string;
}

interface SECRET_KEY {
  JWT_SECRET_KEY?: string | undefined;
}

const { JWT_SECRET_KEY }: SECRET_KEY = process.env;

const loginAuth: ExpressFunction = async (req, res, next) => {
  try {
    passport.authenticate('local', (error, user, { message }: Message) => {
      if (error || !user) return res.status(400).json({ result: 'fail', message });

      const payload = { email: user.email };
      const AccessToken = jwt.sign(payload, JWT_SECRET_KEY!);
      const RefreshToken = jwt.sign(payload, JWT_SECRET_KEY!);

      // 리프레시 토큰 서버에 저장 로직 추가 필요

      res.status(200).json({ result: 'success', AccessToken });
    })(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default loginAuth;
