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
    const posts = await Post.find({ author: userId });
    //@ts-ignore
    const userData = { ...user._doc, password: null, posts };
    res.status(200).json(userData);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.post('/follow', async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.userId;
  const { followingId } = req.body;
  try {
    const user = await User.findById(userId);
    const followingUser = await User.findById(followingId);
    if (user && followingUser && !user.following.includes(followingId)) {
      await User.findByIdAndUpdate(userId, { $set: { following: [...user.following, followingId] } });
      await User.findByIdAndUpdate(followingId, { $set: { followedBy: [...followingUser.followedBy, userId] } });
      res.status(201).json({ message: 'follow success' });
    } else if (user && followingUser && user.following.includes(followingId)) {
      await User.findByIdAndUpdate(userId, {
        $set: { following: [user.following.filter((_user) => _user !== followingId)] },
      });
      await User.findByIdAndUpdate(followingId, {
        $set: { following: [followingUser.following.filter((_user) => _user !== userId)] },
      });
      res.status(201).json({ message: 'unfollow success' });
    }
  } catch (error) {
    res.status(409).json(error);
    console.log(error);
  }
});

export default router;
