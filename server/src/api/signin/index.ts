import express from 'express';
import signinAuth from '@passport/auth';

const router = express.Router();

router.post('/', signinAuth);

export default router;
