import { Router } from 'express';
import auth from '../middleware/auth';
import { getUser, followUser } from '../controller/user';

const router = Router();

router.get('/:userId', getUser);
router.post('/follow/:followingId', auth, followUser);

export default router;
