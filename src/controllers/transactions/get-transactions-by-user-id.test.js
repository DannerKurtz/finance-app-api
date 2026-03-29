import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';
import { UserNotFoundError } from '../../errors/user';
import { GetTransactionsByUserIdController } from './get-transactions-by-user-id';

describe('Get Transaction By User Id Controller', () => {
  class GetTransactionByUserIdUseCaseStub {
    async execute() {
      return [
        {
          id: faker.string.uuid(),
          userId: faker.string.uuid(),
          name: faker.commerce.productName(),
          date: faker.date.anytime().toISOString(),
          type: 'EXPENSE',
          amount: Number(faker.finance.amount()),
        },
      ];
    }
  }
  const makeSut = () => {
    const getTransactionsByUserIdUseCase =
      new GetTransactionByUserIdUseCaseStub();
    const sut = new GetTransactionsByUserIdController(
      getTransactionsByUserIdUseCase,
    );

    return { sut, getTransactionsByUserIdUseCase };
  };
  it('should return 200 when finding transaction by user id successfully', async () => {
    //arrange
    const { sut } = makeSut();
    //act
    const result = await sut.execute({
      query: { userId: faker.string.uuid() },
    });
    //assert
    expect(result.statusCode).toBe(200);
  });

  it('should return 400 if the field userId is missing', async () => {
    //arrange
    const { sut } = makeSut();
    //act
    const result = await sut.execute({ query: { userId: undefined } });
    //assert
    expect(result.statusCode).toBe(400);
  });

  it('should return 400 if userId is invalid', async () => {
    //arrange
    const { sut } = makeSut();
    //act
    const result = await sut.execute({ query: { userId: 'INVALID_USER_ID' } });
    //assert
    expect(result.statusCode).toBe(400);
  });
  it('should return 404 if userId not found', async () => {
    //arrange
    const { sut, getTransactionsByUserIdUseCase } = makeSut();
    jest
      .spyOn(getTransactionsByUserIdUseCase, 'execute')
      .mockRejectedValueOnce(new UserNotFoundError(faker.string.uuid()));
    //act
    const result = await sut.execute({
      query: { userId: faker.string.uuid() },
    });
    //assert
    expect(result.statusCode).toBe(404);
  });
});
