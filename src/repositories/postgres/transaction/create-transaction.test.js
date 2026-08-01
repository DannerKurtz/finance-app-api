import { jest } from '@jest/globals';
import dayjs from 'dayjs';
import { prisma } from '../../../../prisma/prisma';
import { user as fakerUser, transaction } from '../../../tests';
import { PostgresCreateTransactionRepository } from './create-transaction';

describe('PostgresCreateTransactionRepository', () => {
  it('should create a transaction', async () => {
    const user = await prisma.user.create({ data: fakerUser });
    const sut = new PostgresCreateTransactionRepository();

    const result = await sut.execute({ ...transaction, user_id: user.id });

    expect(result.name).toBe(transaction.name);
    expect(result.amount.toString()).toBe(transaction.amount.toString());
    expect(result.type).toBe(transaction.type);
    expect(result.user_id).toBe(user.id);
    expect(dayjs(result.date).daysInMonth()).toBe(
      dayjs(transaction.date).daysInMonth(),
    );
  });

  it('should call Prisma with correct values', async () => {
    const user = await prisma.user.create({ data: fakerUser });
    const prismaSpy = jest.spyOn(prisma.transaction, 'create');
    const sut = new PostgresCreateTransactionRepository();

    const { user_id, ...transactionData } = transaction;

    await sut.execute({ ...transaction, user_id: user.id });

    expect(prismaSpy).toHaveBeenCalledWith({
      data: {
        ...transactionData,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  });

  it('should throw if Prisma throws', async () => {
    jest.spyOn(prisma.transaction, 'create').mockRejectedValue(new Error());
    const sut = new PostgresCreateTransactionRepository();

    const promise = sut.execute();

    await expect(promise).rejects.toThrow();
  });
});
