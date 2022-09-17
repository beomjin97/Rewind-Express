import { Router, Request, Response } from 'express';
import User from '@src/schema/user';
import Post from '@src/schema/post';

const router = Router();

router.get('/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId)
      .populate({ path: 'following', select: ['userName', '_id'] })
      .populate({ path: 'followedBy', select: ['userName', '_id'] })
      .populate({ path: 'likes', select: ['imgUrl', '_id'] });
    const post = await Post.find({ author: userId });
    //@ts-ignore
    const userData = { ...user._doc, password: null, post };
    res.status(200).json(userData);
  } catch (error) {
    res.status(404).json(error);
  }
});

export default router;
