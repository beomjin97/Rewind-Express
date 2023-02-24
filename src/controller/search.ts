import { Request, Response } from 'express';
import User from '../schema/user';

export const searchUser = async (req: Request, res: Response) => {
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
};
