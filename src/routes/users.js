import { Router } from 'express';
import {
  makeCreateUserController,
  makeDeleteUserController,
  makeGetUserBalanceController,
  makeGetUserByIdController,
  makeUpdateUserController,
} from '../factory/controller/user.js';

export const usersRouter = Router();
usersRouter.post('/', async (req, res) => {
  const createUserController = makeCreateUserController();
  const createUserResponse = await createUserController.execute(req);

  res.status(createUserResponse.statusCode).json(createUserResponse.body);
});

usersRouter.patch('/:userId', async (req, res) => {
  const updateUserController = makeUpdateUserController();
  const updateUserRequest = await updateUserController.execute(req);
  res.status(updateUserRequest.statusCode).json(updateUserRequest.body);
});

usersRouter.get('/:userId', async (req, res) => {
  const getUserByIdController = makeGetUserByIdController();

  const getUserByIdResponse = await getUserByIdController.execute(req);

  res.status(getUserByIdResponse.statusCode).json(getUserByIdResponse.body);
});

usersRouter.get('/:userId/balance', async (req, res) => {
  const getUserBalanceController = makeGetUserBalanceController();

  const getUserBalanceResponse = await getUserBalanceController.execute(req);

  res
    .status(getUserBalanceResponse.statusCode)
    .json(getUserBalanceResponse.body);
});

usersRouter.delete('/:userId', async (req, res) => {
  const deleteUserController = makeDeleteUserController();

  const deleteUserResponse = await deleteUserController.execute(req);

  res.status(deleteUserResponse.statusCode).json(deleteUserResponse.body);
});
