import User from '@src/schema/user';
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const { user } = req.query;
  try {
    const searchUser = await User.findOne({ userName: user });
    if (searchUser) {
      res.json({ userId: searchUser._id });
    } else {
      res.status(404).json({ message: '존재하지 않는 사용자입니다.' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
router.post('/follow/:followingId');

export default router;
