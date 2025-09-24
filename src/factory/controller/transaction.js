import { CreateTransactionController } from "../../controllers/index.js";
import { PostgresCreateTransactionRepository } from '../../repositories/postgres/index.js';
import { CreateTransactionUseCase } from "../../use-cases/index.js";

export const makeCreateTransactionController = () => {
  const createTransactionRepository = new PostgresCreateTransactionRepository()
  const crateTransactionUseCase = new CreateTransactionUseCase(createTransactionRepository)
  const createTransactionController = new CreateTransactionController(crateTransactionUseCase)
  return createTransactionController
}