import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';
import { CreateTransactionController } from './create-transaction';

describe('Create Transaction Controller', () => {
  class CreateTransactionUseCaseStub {
    async execute(transaction) {
      return transaction;
    }
  }
  const makeSut = () => {
    const createTransactionUseCase = new CreateTransactionUseCaseStub();
    const sut = new CreateTransactionController(createTransactionUseCase);

    return { sut, createTransactionUseCase };
  };

  const baseHttpRequest = {
    body: {
      userId: faker.string.uuid(),
      name: faker.commerce.productName(),
      date: faker.date.anytime().toISOString(),
      type: 'EXPENSE',
      amount: Number(faker.finance.amount()),
    },
  };

  it('should return 201 when creating transaction successfully', async () => {
    //arrange
    const { sut } = makeSut();
    //act
    const response = await sut.execute(baseHttpRequest);
    console.log('BODY:', baseHttpRequest.body);
    console.log(response);
    //assert
    expect(response.statusCode).toBe(201);
  });

  it('should return 400 when missing userId', async () => {
    //arrange
    const { sut } = makeSut();

    //act
    const result = await sut.execute({
      body: {
        ...baseHttpRequest,
        userId: undefined,
      },
    });

    //assert
    expect(result.statusCode).toBe(400);
  });

  it('should return 400 when missing name', async () => {
    //arrange
    const { sut } = makeSut();

    //act
    const result = await sut.execute({
      body: {
        ...baseHttpRequest,
        name: undefined,
      },
    });

    //assert
    expect(result.statusCode).toBe(400);
  });

  it('should return 400 when missing date', async () => {
    //arrange
    const { sut } = makeSut();

    //act
    const result = await sut.execute({
      body: {
        ...baseHttpRequest,
        date: undefined,
      },
    });

    //assert
    expect(result.statusCode).toBe(400);
  });

  it('should return 400 when missing type', async () => {
    //arrange
    const { sut } = makeSut();

    //act
    const result = await sut.execute({
      body: {
        ...baseHttpRequest,
        type: undefined,
      },
    });

    //assert
    expect(result.statusCode).toBe(400);
  });

  it('should return 400 when missing amount', async () => {
    //arrange
    const { sut } = makeSut();

    //act
    const result = await sut.execute({
      body: {
        ...baseHttpRequest,
        amount: undefined,
      },
    });

    //assert
    expect(result.statusCode).toBe(400);
  });

  it('should return 500 when server error', async () => {
    //arrange
    const { sut, createTransactionUseCase } = makeSut();
    jest
      .spyOn(createTransactionUseCase, 'execute')
      .mockRejectedValueOnce(() => new Error());
    //act
    const result = await sut.execute(baseHttpRequest);
    //assert
    expect(result.statusCode).toBe(500);
  });

  it('should call CreateTransactionsUseCase with correct params', async () => {
    //arrange
    const { sut, createTransactionUseCase } = makeSut();
    const executeSpy = jest.spyOn(createTransactionUseCase, 'execute');
    console.log('olá', executeSpy);
    //act
    await sut.execute(baseHttpRequest);
    //assert
    expect(executeSpy).toHaveBeenCalledWith(baseHttpRequest.body);
  });
});
