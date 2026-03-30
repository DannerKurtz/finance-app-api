import { faker } from '@faker-js/faker';
import { UpdateTransactionController } from './update-transaction';

describe('Update Transaction Controller', () => {
  class UpdateTransactionUseCaseStub {
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
    const updateTransactionUseCase = new UpdateTransactionUseCaseStub();
    const sut = new UpdateTransactionController(updateTransactionUseCase);

    return {
      updateTransactionUseCase,
      sut,
    };
  };

  const baseHttpRequest = {
    params: {
      transactionId: faker.string.uuid(),
    },
    body: {
      name: faker.commerce.productName(),
      date: faker.date.anytime().toISOString(),
      type: 'EXPENSE',
      amount: Number(faker.finance.amount()),
    },
  };
  it('should return 200 when updating a transaction successfully', async () => {
    //arrange
    const { sut } = makeSut();
    //act
    const result = await sut.execute(baseHttpRequest);
    //assert
    expect(result.statusCode).toBe(200);
  });

  it('should return 400 when transaction id is invalid', async () => {
    //arrange
    const { sut } = makeSut();
    //act
    const result = await sut.execute({
      params: {
        transactionId: 'INVALID_ID',
      },
      body: { ...baseHttpRequest.body },
    });
    //assert
    expect(result.statusCode).toBe(400);
  });

  it('should return 400 when unallowed field is provided', async () => {
    //arrange
    const { sut } = makeSut();
    //act
    const result = await sut.execute({
      params: baseHttpRequest.params,
      body: {
        ...baseHttpRequest.body,
        userId: 'User_Id',
      },
    });
    //assert
    expect(result.statusCode).toBe(400);
  });
});
