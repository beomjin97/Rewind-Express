import { Router } from 'express';

import { signIn, signUp } from '../controller/auth';

const router = Router();

router.post('/signIn', signIn);
router.post('/signUp', signUp);

export default router;
