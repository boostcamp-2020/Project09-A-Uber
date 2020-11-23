import express from 'express';
import loginAuth from '@passport/auth';

const router = express.Router();

router.post('/', loginAuth);

export default router;
