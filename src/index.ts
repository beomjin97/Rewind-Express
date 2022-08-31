import express, { Application, Response, Request } from 'express';
import cors from 'cors';

import connect from './schema';
import indexRouter from '@src/routes';
import authRouter from '@src/routes/auth';
import postRouter from '@src/routes/post';

const app: Application = express();

const PORT = 5000;
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: false }));

connect();

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);

app.listen(PORT, () => {
  console.log(`The Express server is listening at port : ${PORT}`);
});
