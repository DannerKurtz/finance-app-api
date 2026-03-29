import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';
import { DeleteTransactionController } from './delete-transaction';
describe('Delete Transaction Controller', () => {
  class DeleteTransactionUseCaseStub {
    async execute() {
      return {
        id: faker.string.uuid(),
        userId: faker.string.uuid(),
        name: faker.commerce.productName(),
        date: faker.date.anytime().toISOString(),
        type: 'EXPENSE',
        amount: Number(faker.finance.amount()),
      };
    }
  }
  const makeSut = () => {
    const deleteTransactionUseCase = new DeleteTransactionUseCaseStub();
    const sut = new DeleteTransactionController(deleteTransactionUseCase);

    return { sut, deleteTransactionUseCase };
  };
  it('should return 200 when deleting a transaction successfully', async () => {
    //arrange
    const { sut } = makeSut();
    //act
    const result = await sut.execute({
      params: { transactionId: faker.string.uuid() },
    });
    //assert
    expect(result.statusCode).toBe(200);
  });

  it('should return 404 when an id not found', async () => {
    //arrange
    const { sut, deleteTransactionUseCase } = makeSut();
    jest.spyOn(deleteTransactionUseCase, 'execute').mockReturnValue(false);
    //act
    const result = await sut.execute({
      params: { transactionId: faker.string.uuid() },
    });
    //assert
    expect(result.statusCode).toBe(404);
  });

  it('should return 500 when a server error', async () => {
    //arrange
    const { sut, deleteTransactionUseCase } = makeSut();
    jest
      .spyOn(deleteTransactionUseCase, 'execute')
      .mockRejectedValueOnce(() => new Error());
    //act
    const result = await sut.execute({
      params: { transactionId: faker.string.uuid() },
    });
    //assert
    expect(result.statusCode).toBe(500);
  });
});
