import passport from 'passport';
import local from '@passport/local';
import jwt from '@passport/jwt';

export default () => {
  passport.use('local', local);
  passport.use('jwt', jwt);
};
