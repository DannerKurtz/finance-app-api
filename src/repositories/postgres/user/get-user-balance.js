import { prisma } from "../../../../prisma/prisma.js";
import { Prisma } from "../../../generated/prisma/index.js";


export class PostgresGetUserBalanceRepository{
  async execute(userId){
    const {_sum: {amount: totalExpenses}} = await prisma.transaction.aggregate({
      where: {
        user_id: userId,
        type: 'EXPENSE'
      },
      _sum: {
        amount: true
      }
    })
    const {_sum: {amount: totalEarnings}} = await prisma.transaction.aggregate({
      where: {
        user_id: userId,
        type: 'EARNING'
      },
      _sum: {
        amount: true
      }
    })

     const {_sum: {amount: totalInvestments}} = await prisma.transaction.aggregate({
      where: {
        user_id: userId,
        type: 'INVESTMENT'
      },
      _sum: {
        amount: true
      }
    })
    
    const balance = (totalEarnings ?? new Prisma.Decimal(0)) - (totalExpenses ?? Prisma.Decimal(0)) - (totalInvestments ?? Prisma.Decimal(0))
    return { balance: Prisma.Decimal(balance), totalEarnings: totalEarnings ?? Prisma.Decimal(0), totalExpenses: totalExpenses ?? Prisma.Decimal(0), totalInvestments: totalInvestments ?? Prisma.Decimal(0)}
  }
}