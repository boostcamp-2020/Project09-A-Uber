import passport from 'passport';
import local from '@passport/local';
// import jwt from '@passport/jwt';

passport.use('local', local);
// passport.use('jwt', jwt);

export default passport;
