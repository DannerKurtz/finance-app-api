import { prisma } from '../../../../prisma/prisma';
import { user as fakerUser } from '../../../tests/';
import { PostgresGetUserBalanceRepository } from './get-user-balance';

describe('PostgresGetUserBalanceRepository', () => {
  it('should return the user balance', async () => {
    const user = await prisma.user.create({ data: fakerUser });

    await prisma.transaction.createMany({
      data: [
        {
          amount: 5000,
          type: 'EARNING',
          user_id: user.id,
          name: 'Salary',
          date: new Date(),
        },
        {
          amount: 5000,
          type: 'EARNING',
          user_id: user.id,
          name: 'Bonus',
          date: new Date(),
        },
        {
          amount: 1000,
          type: 'EXPENSE',
          user_id: user.id,
          name: 'Groceries',
          date: new Date(),
        },
        {
          amount: 1000,
          type: 'EXPENSE',
          user_id: user.id,
          name: 'Taxi',
          date: new Date(),
        },
        {
          amount: 3000,
          type: 'INVESTMENT',
          user_id: user.id,
          name: 'Stocks',
          date: new Date(),
        },
        {
          amount: 3000,
          type: 'INVESTMENT',
          user_id: user.id,
          name: 'Bonds',
          date: new Date(),
        },
      ],
    });

    const sut = new PostgresGetUserBalanceRepository();
    const result = await sut.execute(user.id);

    expect(result.totalEarnings.toString()).toEqual('10000');
    expect(result.totalExpenses.toString()).toEqual('2000');
    expect(result.totalInvestments.toString()).toEqual('6000');
  });
});
