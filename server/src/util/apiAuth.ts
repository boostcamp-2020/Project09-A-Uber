import passport from '@passport/index';

import { ExpressFunction } from '@type/ExpressFunction';

const JWT_HEADER = process.env.JWT_HEADER as string;

const apiAuth: ExpressFunction = (req, res, next) => {
  if (!req.headers.authorization) {
    const cookie = req.cookies[JWT_HEADER];
    req.headers.authorization = cookie && `bearer ${cookie}`;
  }

  passport.authenticate('jwt', (error, payload, { message } = {}) => {
    if (error || !payload) return res.status(400).send({ result: 'fail', message });
    req.user = payload.email;
    next();
  })(req, res, next);
};

export default apiAuth;
