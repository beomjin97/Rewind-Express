import { Router } from 'express';
import auth from '@src/middleware/auth';
import { getUser, followUser } from '@src/controller/user';

const router = Router();

router.get('/:userId', getUser);
router.post('/follow/:followingId', auth, followUser);

export default router;
