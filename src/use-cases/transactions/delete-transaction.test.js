import { jest } from '@jest/globals';
import { transaction } from '../../tests';
import { DeleteTransactionUseCase } from './delete-transaction';

describe('Delete Transaction Use Case', () => {
  class DeleteTransactionRepositoryStub {
    async execute() {
      return transaction;
    }
  }

  const makeSut = () => {
    const deleteTransactionRepository = new DeleteTransactionRepositoryStub();
    const sut = new DeleteTransactionUseCase(deleteTransactionRepository);

    return {
      sut,
      deleteTransactionRepository,
    };
  };

  it('should delete transaction successfully', async () => {
    // Arrange
    const { sut } = makeSut();

    // Act
    const deletedTransaction = await sut.execute(transaction.id);
    // Assert
    expect(deletedTransaction).toEqual({ ...transaction, id: transaction.id });
  });

  it('should call deleteTransactionRepository with correct params', async () => {
    // Arrange
    const { sut, deleteTransactionRepository } = makeSut();
    const deleteTransactionRepositorySpy = jest.spyOn(
      deleteTransactionRepository,
      'execute',
    );

    // Act
    await sut.execute(transaction.id);

    // Assert
    expect(deleteTransactionRepositorySpy).toHaveBeenCalledWith(transaction.id);
  });

  it('should throw if deleteTransactionRepository throws', async () => {
    // Arrange
    const { sut, deleteTransactionRepository } = makeSut();
    jest
      .spyOn(deleteTransactionRepository, 'execute')
      .mockRejectedValueOnce(new Error());

    // Act
    const promise = sut.execute(transaction.id);

    // Assert
    await expect(promise).rejects.toThrow();
  });
});
