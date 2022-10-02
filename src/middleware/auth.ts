import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    let decodedData;
    if (token) {
      decodedData = jwt.verify(token, process.env.JWT || 'test');
    }
    //@ts-ignore
    req.userId = decodedData._id;
    next();
  } catch (error) {
    res.status(401).json({ message: '로그인이 만료되었습니다.' });
    console.log(error);
  }
};

export default auth;
