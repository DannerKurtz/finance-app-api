import 'dotenv/config.js';
import express from 'express';
import { makeCreateTransactionController, makeGetTransactionsByUserIdController } from './factory/controller/transaction.js';
import { makeCreateUserController, makeDeleteUserController, makeGetUserByIdController, makeUpdateUserController } from './factory/controller/user.js';

const app = express() 
app.use(express.json())

app.post('/api/users', async (req, res) => {

  const createUserController = makeCreateUserController()
  const createUserResponse = await createUserController.execute(req);

  res.status(createUserResponse.statusCode).json(createUserResponse.body);
})

app.patch('/api/users/:userId', async (req, res) => {
  const updateUserController = makeUpdateUserController()
  const updateUserRequest = await updateUserController.execute(req);
  res.status(updateUserRequest.statusCode).json(updateUserRequest.body);
})

app.get('/api/users/:userId', async (req, res) => {
  const getUserByIdController = makeGetUserByIdController();

  const getUserByIdResponse = await getUserByIdController.execute(req);

  res.status(getUserByIdResponse.statusCode).json(getUserByIdResponse.body);
});
  
app.delete('/api/users/:userId', async (req, res) => {
  const deleteUserController = makeDeleteUserController()

  const deleteUserResponse = await deleteUserController.execute(req);
  
  res.status(deleteUserResponse.statusCode).json(deleteUserResponse.body);
})

app.get('/api/transactions', async (req, res) => {
  const getTransactionsByUserIdController = makeGetTransactionsByUserIdController();
  const getTransactionsByUserIdResponse = await getTransactionsByUserIdController.execute(req);

  res.status(getTransactionsByUserIdResponse.statusCode).json(getTransactionsByUserIdResponse.body);
})

app.post('/api/transactions', async (req, res) => {
  const createTransactionController = makeCreateTransactionController();
  const createTransactionResponse = await createTransactionController.execute(req);

  res.status(createTransactionResponse.statusCode).json(createTransactionResponse.body);
})


app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
})