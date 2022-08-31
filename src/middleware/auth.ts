import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('token', token);
    let decodedData;
    if (token) {
      decodedData = jwt.verify(token, process.env.JWT || 'test');
      //console.log(decodedData);
    }
    //@ts-ignore
    req.userId = decodedData._id;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
