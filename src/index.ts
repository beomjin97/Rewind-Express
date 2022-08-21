import express, { Application, Response, Request } from 'express';
import cors from 'cors';

import connect from './schema';
import indexRouter from '@src/routes';
import authRouter from '@src/routes/auth';

const app: Application = express();

const PORT = 5000;
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

connect();

app.use('/', indexRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`The Express server is listening at port : ${PORT}`);
});
