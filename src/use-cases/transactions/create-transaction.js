import { v4 as uuid } from 'uuid';
import { UserNotFoundError } from '../../errors/user.js';

export class CreateTransactionUseCase{
  constructor(createTransactionRepository, getUserByIdRepository){
    this.createTransactionRepository = createTransactionRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }
  async execute(createTransactionParams){
    const { userId } = createTransactionParams;
    
    const user = await this.getUserByIdRepository.execute(userId);
    if(!user){
      throw UserNotFoundError(userId);
    }

    const transactionId = uuid();
    const transaction = await this.createTransactionRepository.execute(
      {...createTransactionParams, id: transactionId}
    )

    return transaction
  }
}