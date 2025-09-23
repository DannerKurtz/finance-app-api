import { v4 as uuidv4 } from 'uuid';

export class CreateTransactionUseCase{
  constructor(createTransactionRepository, getUserByIdRepository){
    this.createTransactionRepository = createTransactionRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }
  async execute(createTransactionParams){
    const { userId } = createTransactionParams;
    
    const user = await this.getUserByIdRepository.getById(userId);
    if(!user){
      throw new Error('User not found');
    }

    const transactionId = uuidv4;
    const transaction = await this.createTransactionRepository.execute(
      {...createTransactionParams, id: transactionId}
    )

    return transaction
  }
}