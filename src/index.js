import 'dotenv/config.js';
import express from 'express';
import { CreateUserController, DeleteUserController, GetUserByIdController, UpdateUserController } from './controllers/index.js';
import { PostgresCreateUserRepository } from './repositories/postgres/create-user.js';
import { PostgresDeleteUserRepository } from './repositories/postgres/delete-user.js';
import { PostgresGetUserByEmailRepository } from './repositories/postgres/get-user-by-email.js';
import { PostgresGetUserByIdRepository } from './repositories/postgres/get-user-by-id.js';
import { PostgresUpdateUserRepository } from './repositories/postgres/update-user.js';
import { CreateUserUseCase } from './use-cases/create-user.js';
import { DeleteUserUseCase } from './use-cases/delete-user.js';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.js';
import { UpdateUserUseCase } from './use-cases/update-user.js';

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
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
  const updateUserRepository = new PostgresUpdateUserRepository();
  const updateUserUseCase = new UpdateUserUseCase(getUserByEmailRepository, updateUserRepository)
  const updateUserController = new UpdateUserController(updateUserUseCase);
  const updateUserRequest = await updateUserController.execute(req);
  res.status(updateUserRequest.statusCode).json(updateUserRequest.body);
})

app.get('/api/users/:userId', async (req, res) => {
  const getUserByIdRepository = new PostgresGetUserByIdRepository();

  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);

  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

  const getUserByIdResponse = await getUserByIdController.execute(req);

  res.status(getUserByIdResponse.statusCode).json(getUserByIdResponse.body);
});
  
app.delete('/api/users/:userId', async (req, res) => {
  const deleteUserRepository = new PostgresDeleteUserRepository()

  const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository)

  const deleteUserController = new DeleteUserController(deleteUserUseCase);

  const deleteUserResponse = await deleteUserController.execute(req);
  
  res.status(deleteUserResponse.statusCode).json(deleteUserResponse.body);
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
})