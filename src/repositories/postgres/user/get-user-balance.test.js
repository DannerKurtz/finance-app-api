import { jest } from '@jest/globals';
import { prisma } from '../../../../prisma/prisma';
import { transaction_type } from '../../../generated/prisma';
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

  it('should call Prisma with correct params', async () => {
    const sut = new PostgresGetUserBalanceRepository();
    const prismaSpy = jest.spyOn(prisma.transaction, 'aggregate');

    await sut.execute(fakerUser.id);
    expect(prismaSpy).toHaveBeenCalledTimes(3);
    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        user_id: fakerUser.id,
        type: transaction_type.EARNING,
      },
      _sum: {
        amount: true,
      },
    });
    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        user_id: fakerUser.id,
        type: transaction_type.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    });
    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        user_id: fakerUser.id,
        type: transaction_type.INVESTMENT,
      },
      _sum: {
        amount: true,
      },
    });
  });

  it('should throw if Prisma throws', async () => {
    const sut = new PostgresGetUserBalanceRepository();
    jest
      .spyOn(prisma.transaction, 'aggregate')
      .mockRejectedValueOnce(new Error());

    const promise = sut.execute(fakerUser.id);

    await expect(promise).rejects.toThrow();
  });
});
