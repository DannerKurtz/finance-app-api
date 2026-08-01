import { jest } from '@jest/globals';
import { prisma } from '../../../../prisma/prisma';
import { transaction, user } from '../../../tests';
import { PostgresGetTransactionsByUserIdRepository } from './get-transactions-by-user-id';

describe('PostgresGetTransactionsByUserIdRepository', () => {
  it('should get transactions by user id on db', async () => {
    const sut = new PostgresGetTransactionsByUserIdRepository();
    await prisma.user.create({ data: user });
    await prisma.transaction.create({
      data: { ...transaction, user_id: user.id },
    });

    const result = await sut.execute(user.id);

    expect(result[0].name).toBe(transaction.name);
  });

  it('should call Prisma with correct values', async () => {
    const prismaSpy = jest.spyOn(prisma.transaction, 'findMany');
    const sut = new PostgresGetTransactionsByUserIdRepository();

    await sut.execute(user.id);

    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        user_id: user.id,
      },
    });
  });

  it('should throw if Prisma throws', async () => {
    jest.spyOn(prisma.transaction, 'findMany').mockRejectedValue(new Error());
    const sut = new PostgresGetTransactionsByUserIdRepository();

    const promise = sut.execute(user.id);

    await expect(promise).rejects.toThrow();
  });
});
