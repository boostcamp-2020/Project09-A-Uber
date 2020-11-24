import { Router } from 'express';

import userSignupAPI from './userSignup';

const router = Router();

router.post('/user', userSignupAPI);

export default router;
