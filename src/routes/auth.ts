import { Router } from 'express';

import { signIn, signUp } from '@src/controller/auth';

const router = Router();

router.post('/signIn', signIn);
router.post('/signUp', signUp);

export default router;
