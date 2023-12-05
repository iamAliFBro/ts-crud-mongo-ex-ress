import express, { Application } from 'express';
import cors from 'cors';
import { testRouter } from './testRouter';
import { userRouter } from './app/user/user.router';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/', testRouter);
app.use('/api/users', userRouter)


export default app;
