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
});
