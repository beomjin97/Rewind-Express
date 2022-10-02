import { Router } from 'express';
import { searchUser } from '@src/controller/search';

const router = Router();

router.get('/', searchUser);

export default router;
