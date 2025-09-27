import { CreateTransactionController, GetTransactionsByUserIdController } from "../../controllers/index.js";
import { PostgresCreateTransactionRepository, PostgresGetTransactionsByUserIdRepository, PostgresGetUserByIdRepository } from '../../repositories/postgres/index.js';
import { CreateTransactionUseCase, GetTransactionsByUserIdUseCase } from "../../use-cases/index.js";

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