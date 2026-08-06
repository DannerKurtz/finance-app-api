import { Router } from 'express';
import {
  makeCreateTransactionController,
  makeDeleteTransactionController,
  makeGetTransactionsByUserIdController,
  makeUpdateTransactionController,
} from '../factory/controller/transaction.js';

export const transactionRouter = Router();

transactionRouter.get('', async (req, res) => {
  const getTransactionsByUserIdController =
    makeGetTransactionsByUserIdController();
  const getTransactionsByUserIdResponse =
    await getTransactionsByUserIdController.execute(req);

  res
    .status(getTransactionsByUserIdResponse.statusCode)
    .json(getTransactionsByUserIdResponse.body);
});

transactionRouter.post('/', async (req, res) => {
  const createTransactionController = makeCreateTransactionController();
  const createTransactionResponse =
    await createTransactionController.execute(req);

  res
    .status(createTransactionResponse.statusCode)
    .json(createTransactionResponse.body);
});

transactionRouter.patch('/:transactionId', async (req, res) => {
  const updateTransactionController = makeUpdateTransactionController();
  const updateTransactionResponse =
    await updateTransactionController.execute(req);

  res
    .status(updateTransactionResponse.statusCode)
    .json(updateTransactionResponse.body);
});

transactionRouter.delete('/:transactionId', async (req, res) => {
  const deleteTransactionController = makeDeleteTransactionController();
  const deleteTransactionResponse =
    await deleteTransactionController.execute(req);

  res
    .status(deleteTransactionResponse.statusCode)
    .json(deleteTransactionResponse.body);
});
