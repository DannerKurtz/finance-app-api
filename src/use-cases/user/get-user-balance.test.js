import { faker } from '@faker-js/faker';
import { GetUserBalanceUseCase } from './get-user-balance';

describe('GetUserBalanceUseCase', () => {
  const userBalance = {
    earnings: faker.finance.amount(),
    expense: faker.finance.amount(),
    investments: faker.finance.amount(),
    balance: faker.finance.amount(),
  };
  const user = {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({
      length: 7,
    }),
  };
  class GetUserBalanceRepositoryStub {
    async execute() {
      return userBalance;
    }
  }
  class GetUserByIdRepositoryStub {
    async execute() {
      return user;
    }
  }

  const makeSut = () => {
    const getUserBalanceRepository = new GetUserBalanceRepositoryStub();
    const getUserByIdRepository = new GetUserByIdRepositoryStub();
    const sut = new GetUserBalanceUseCase(
      getUserBalanceRepository,
      getUserByIdRepository,
    );

    return {
      sut,
      getUserBalanceRepository,
      getUserByIdRepository,
    };
  };

  it('should get user balance', async () => {
    //arrange
    const { sut } = makeSut();
    //act
    const result = await sut.execute(faker.string.uuid());
    //assert
    expect(result).toBe(userBalance);
  });
});
