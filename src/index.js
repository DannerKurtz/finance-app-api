import 'dotenv/config.js';
import express from 'express';
import {
  makeCreateTransactionController,
  makeDeleteTransactionController,
  makeGetTransactionsByUserIdController,
  makeUpdateTransactionController,
} from './factory/controller/transaction.js';
import { usersRouter } from './routes/users.js';

const app = express();
app.use(express.json());

app.use('/api/users', usersRouter);

app.get('/api/transactions', async (req, res) => {
  const getTransactionsByUserIdController =
    makeGetTransactionsByUserIdController();
  const getTransactionsByUserIdResponse =
    await getTransactionsByUserIdController.execute(req);

  res
    .status(getTransactionsByUserIdResponse.statusCode)
    .json(getTransactionsByUserIdResponse.body);
});

app.post('/api/transactions', async (req, res) => {
  const createTransactionController = makeCreateTransactionController();
  const createTransactionResponse =
    await createTransactionController.execute(req);

  res
    .status(createTransactionResponse.statusCode)
    .json(createTransactionResponse.body);
});

app.patch('/api/transactions/:transactionId', async (req, res) => {
  const updateTransactionController = makeUpdateTransactionController();
  const updateTransactionResponse =
    await updateTransactionController.execute(req);

  res
    .status(updateTransactionResponse.statusCode)
    .json(updateTransactionResponse.body);
});

app.delete('/api/transactions/:transactionId', async (req, res) => {
  const deleteTransactionController = makeDeleteTransactionController();
  const deleteTransactionResponse =
    await deleteTransactionController.execute(req);

  res
    .status(deleteTransactionResponse.statusCode)
    .json(deleteTransactionResponse.body);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
