import express, { Application, Response, Request } from 'express';
import cors from 'cors';

import connect from './schema';
import indexRouter from '@src/routes';
import authRouter from '@src/routes/auth';
import postRouter from '@src/routes/post';
import userRouter from '@src/routes/user';
import searchRouter from '@src/routes/search';

const app: Application = express();

const PORT = 5000;
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: false }));

app.use('/api/uploads', express.static('uploads'));

connect();

app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/api/user', userRouter);
app.use('/api/search', searchRouter);

app.listen(PORT, () => {
  console.log(`The Express server is listening at port : ${PORT}`);
});
