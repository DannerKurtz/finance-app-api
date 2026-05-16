import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';
import { UpdateTransactionUseCase } from './update-transaction';

describe('Update Transaction Use Case', () => {
  const transaction = {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    name: faker.commerce.productName(),
    date: faker.date.anytime().toISOString(),
    type: 'EXPENSE',
    amount: Number(faker.finance.amount()),
  };

  class UpdateTransactionRepositoryStub {
    async execute(transactionId) {
      return {
        id: transactionId,
        ...transaction,
      };
    }
  }
  const makeSut = () => {
    const updateTransactionRepository = new UpdateTransactionRepositoryStub();
    const sut = new UpdateTransactionUseCase(updateTransactionRepository);

    return {
      sut,
      updateTransactionRepository,
    };
  };

  it('should update transaction successfully', async () => {
    // Arrange
    const { sut } = makeSut();

    // Act
    const result = await sut.execute(transaction.id, transaction);

    // Assert
    expect(result).toEqual({
      id: transaction.id,
      ...transaction,
    });
  });

  it('should call UpdateTransactionRepository with correct values', async () => {
    // Arrange
    const { sut, updateTransactionRepository } = makeSut();
    const executeSpy = jest.spyOn(updateTransactionRepository, 'execute');

    // Act
    await sut.execute(transaction.id, transaction);

    // Assert
    expect(executeSpy).toHaveBeenCalledWith(transaction.id, transaction);
  });

  it('should throw if UpdateTransactionRepository throws', async () => {
    // Arrange
    const { sut, updateTransactionRepository } = makeSut();
    jest
      .spyOn(updateTransactionRepository, 'execute')
      .mockRejectedValueOnce(new Error());

    // Act
    const promise = sut.execute(transaction.id, transaction);

    // Assert
    await expect(promise).rejects.toThrow();
  });
});
