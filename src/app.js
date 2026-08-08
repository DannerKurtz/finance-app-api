import express from 'express';
import { transactionRouter } from './routes/transactions.js';
import { usersRouter } from './routes/users.js';

export const app = express();
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/transactions', transactionRouter);
