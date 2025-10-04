import { prisma } from "../../../../prisma/prisma.js";

export class PostgresCreateTransactionRepository {
  async execute(createTransactionParams){
    const { userId, ...transactionData } = createTransactionParams;
    
    return await prisma.transaction.create({
      data: {
        ...transactionData,
        user: {
          connect: {
            id: userId
          }
        }
      }
    })
  }
}