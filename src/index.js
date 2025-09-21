import 'dotenv/config.js';
import express from 'express';
import { CreateUserController, DeleteUserController, GetUserByIdController, UpdateUserController } from './controllers/index.js';
import { PostgresCreateUserRepository } from './repositories/postgres/create-user.js';
import { PostgresGetUserByEmailRepository } from './repositories/postgres/get-user-by-email.js';
import { CreateUserUseCase } from './use-cases/create-user.js';

const app = express() 
app.use(express.json())

app.post('/api/users', async (req, res) => {
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
  const createUserRepository = new PostgresCreateUserRepository()
  const createUserUseCase = new CreateUserUseCase(getUserByEmailRepository, createUserRepository)
  const createUserController = new CreateUserController(createUserUseCase);
  const createUserResponse = await createUserController.execute(req);
  res.status(createUserResponse.statusCode).json(createUserResponse.body);
})

app.patch('/api/users/:userId', async (req, res) => {
  const updateUserController = new UpdateUserController();
  const updateUserRequest = await updateUserController.execute(req);
  res.status(updateUserRequest.statusCode).json(updateUserRequest.body);
})

app.get('/api/users/:userId', async (req, res) => {
  const getUserByIdController = new GetUserByIdController();
  const getUserByIdResponse = await getUserByIdController.execute(req);
  res.status(getUserByIdResponse.statusCode).json(getUserByIdResponse.body);
});
  
app.delete('/api/users/:userId', async (req, res) => {
  const deleteUserController = new DeleteUserController();
  const deleteUserResponse = await deleteUserController.execute(req);
  res.status(deleteUserResponse.statusCode).json(deleteUserResponse.body);
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
})