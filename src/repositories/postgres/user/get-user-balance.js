import { prisma } from "../../../../prisma/prisma.js";


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
    
    const balance = (totalEarnings ?? 0) - (totalExpenses ?? 0) - (totalInvestments ?? 0)

    return {balance, totalEarnings: totalEarnings ?? 0, totalExpenses: totalExpenses ?? 0, totalInvestments: totalInvestments ?? 0}
  }
}