import { jest } from '@jest/globals';
import { prisma } from '../../../../prisma/prisma';
import { user as fakerUser, transaction } from '../../../tests';
import { PostgresDeleteTransactionRepository } from './delete-transaction';

describe('PostgresDeleteTransactionRepository', () => {
  it('should delete a transaction', async () => {
    const { user_id, ...transactionData } = transaction;
    const user = await prisma.user.create({
      data: { ...fakerUser, id: user_id },
    });
    const transactionToDelete = await prisma.transaction.create({
      data: { ...transactionData, user_id: user.id },
    });
    const sut = new PostgresDeleteTransactionRepository();

    const result = await sut.execute(transactionToDelete.id);

    expect(result.id).toBe(transactionToDelete.id);
  });

  it('should call Prisma with correct values', async () => {
    const prismaSpy = jest
      .spyOn(prisma.transaction, 'delete')
      .mockResolvedValue(transaction);
    const sut = new PostgresDeleteTransactionRepository();

    await sut.execute(transaction.id);

    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        id: transaction.id,
      },
    });
  });
});
