import { faker } from '@faker-js/faker';
import { prisma } from '../../../../prisma/prisma';
import { transaction, user } from '../../../tests';
import { PostgresUpdateTransactionRepository } from './update-transaction';

describe('PostgresUpdateTransactionRepository', () => {
  it('should update a transaction', async () => {
    await prisma.user.create({ data: user });
    await prisma.transaction.create({
      data: { ...transaction, user_id: user.id },
    });
    const sut = new PostgresUpdateTransactionRepository();
    const params = {
      id: faker.string.uuid(),
      user_id: user.id,
      name: faker.commerce.productName(),
      date: faker.date.anytime().toISOString(),
      type: 'EXPENSE',
      amount: Number(faker.finance.amount()),
    };

    const result = await sut.execute(transaction.id, params);

    expect(result.name).toBe(params.name);
  });
});
