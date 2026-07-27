import { jest } from '@jest/globals';
import { transaction } from '../../tests';
import { UpdateTransactionUseCase } from './update-transaction';

describe('Update Transaction Use Case', () => {
  class UpdateTransactionRepositoryStub {
    async execute() {
      return transaction;
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
