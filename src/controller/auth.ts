import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '@src/schema/user';

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: '없는 사용자 입니다.' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: '잘못된 비밀번호입니다.' });
    }
    const secret = process.env.JWT ? process.env.JWT : 'test';
    const token = jwt.sign({ userName: existingUser.userName, _id: existingUser._id }, secret, {
      expiresIn: '1m',
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const signUp = async (req: Request, res: Response) => {
  const { name, userName, email, password, passwordConfirm } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: '이미 등록된 사용자입니다.' });
    }
    if (password !== passwordConfirm) {
      return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const createdUser = await User.create({
      name,
      userName,
      email,
      password: hashedPassword,
    });
    res.status(200).json({ message: '회원등록 성공', name: createdUser.name, userName: createdUser.userName });
  } catch (error) {
    res.status(500).json({ error });
  }
};
