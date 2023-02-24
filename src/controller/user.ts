import { Request, Response } from 'express';
import User from '../schema/user';
import Post from '../schema/post';
import { Schema } from 'mongoose';

export const getUser = async (req: Request, res: Response) => {
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
};

export const followUser = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.userId;
  // @ts-ignore
  const { followingId }: { followingId: Schema.Types.ObjectId } = req.params;
  try {
    const user = await User.findById(userId);
    const followingUser = await User.findById(followingId);
    if (user && followingUser && !user.following.includes(followingId)) {
      await User.findByIdAndUpdate(userId, { $set: { following: [...user.following, followingId] } });
      await User.findByIdAndUpdate(followingId, { $set: { followedBy: [...followingUser.followedBy, userId] } });
      res.status(201).json({ message: 'follow success' });
    } else if (user && followingUser && user.following.includes(followingId)) {
      await User.findByIdAndUpdate(userId, {
        $set: { following: user.following.filter((_user) => _user != followingId) },
      });
      await User.findByIdAndUpdate(followingId, {
        $set: { followedBy: followingUser.followedBy.filter((_user) => _user != userId) },
      });
      res.status(201).json({ message: 'unfollow success' });
    }
  } catch (error) {
    res.status(409).json(error);
    console.log(error);
  }
};
