import 'dotenv/config.js';
import express from 'express';
import { transactionRouter } from './routes/transactions.js';
import { usersRouter } from './routes/users.js';

const app = express();
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/transactions', transactionRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
