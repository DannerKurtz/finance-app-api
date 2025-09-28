import { CreateTransactionController, GetTransactionsByUserIdController, UpdateTransactionController } from "../../controllers/index.js";
import { PostgresCreateTransactionRepository, PostgresGetTransactionsByUserIdRepository, PostgresGetUserByIdRepository, PostgresUpdateUserRepository } from '../../repositories/postgres/index.js';
import { CreateTransactionUseCase, GetTransactionsByUserIdUseCase, UpdateTransactionUseCase } from "../../use-cases/index.js";

export const makeCreateTransactionController = () => {
  const createTransactionRepository = new PostgresCreateTransactionRepository()
  const getUserByIdRepository = new PostgresGetUserByIdRepository()
  const crateTransactionUseCase = new CreateTransactionUseCase(createTransactionRepository, getUserByIdRepository)
  const createTransactionController = new CreateTransactionController(crateTransactionUseCase)
  return createTransactionController
}

export const makeGetTransactionsByUserIdController = () => {
  const getUserByIdRepository = new PostgresGetUserByIdRepository();
  const getTransactionsByUserIdRepository = new PostgresGetTransactionsByUserIdRepository();
  const getTransactionsByUserIdUseCase = new GetTransactionsByUserIdUseCase(getTransactionsByUserIdRepository, getUserByIdRepository);
  const getTransactionsByUserIdController = new GetTransactionsByUserIdController(getTransactionsByUserIdUseCase);
  return getTransactionsByUserIdController
}

export const makeUpdateTransactionController = () => {
  const updateTransactionRepository = new PostgresUpdateUserRepository()
  const updateTransactionUseCase = new UpdateTransactionUseCase(updateTransactionRepository);
  const updateTransactionController = new UpdateTransactionController(updateTransactionUseCase);
  return updateTransactionController

}