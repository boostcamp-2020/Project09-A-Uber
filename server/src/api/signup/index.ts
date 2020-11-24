import { Router } from 'express';

import userSignupAPI from './userSignup';
import driverSignupAPI from './driverSignup';

const router = Router();

router.post('/user', userSignupAPI);

router.post('/driver', driverSignupAPI);

export default router;
