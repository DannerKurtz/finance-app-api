import { prisma } from "../../../../prisma/prisma.js";

export class PostgresDeleteTransactionRepository{
  async execute(transactionId){
    return prisma.transaction.delete({
      where: {
        id: transactionId
      }
    })
  }

}