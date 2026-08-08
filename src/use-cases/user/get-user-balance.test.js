import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';
import { UserNotFoundError } from '../../errors/user';
import { user } from '../../tests';
import { GetUserBalanceUseCase } from './get-user-balance';

describe('GetUserBalanceUseCase', () => {
  const userBalance = {
    earnings: faker.finance.amount(),
    expense: faker.finance.amount(),
    investments: faker.finance.amount(),
    balance: faker.finance.amount(),
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

  it('should throw UserNotFoundError if GetUserByIdRepository returns null', async () => {
    const { sut, getUserByIdRepository } = makeSut();
    const userId = faker.string.uuid();

    jest.spyOn(getUserByIdRepository, 'execute').mockResolvedValue(null);

    const promise = sut.execute(userId);

    await expect(promise).rejects.toThrow(new UserNotFoundError(userId));
  });

  it('should call GetUserByIdRepository with correct values', async () => {
    const { sut, getUserByIdRepository } = makeSut();
    const userId = faker.string.uuid();
    const getUserByIdRepositorySpy = jest.spyOn(
      getUserByIdRepository,
      'execute',
    );
    //act
    await sut.execute(userId);
    //assert
    expect(getUserByIdRepositorySpy).toHaveBeenCalledWith(userId);
  });

  it('should call GetUserBalanceRepository with correct values', async () => {
    const { sut, getUserBalanceRepository } = makeSut();
    const userId = faker.string.uuid();
    const getUserBalanceRepositorySpy = jest.spyOn(
      getUserBalanceRepository,
      'execute',
    );
    //act
    await sut.execute(userId);
    //assert
    expect(getUserBalanceRepositorySpy).toHaveBeenCalledWith(userId);
  });

  it('should throw if GetUserByIdRepository throws', async () => {
    const { sut, getUserByIdRepository } = makeSut();
    jest.spyOn(getUserByIdRepository, 'execute').mockRejectedValue(new Error());
    //act
    const promise = sut.execute(faker.string.uuid());
    //assert
    await expect(promise).rejects.toThrow();
  });

  it('should throw if GetUserBalanceRepository throws', async () => {
    const { sut, getUserBalanceRepository } = makeSut();
    jest
      .spyOn(getUserBalanceRepository, 'execute')
      .mockRejectedValue(new Error());
    //act
    const promise = sut.execute(faker.string.uuid());
    //assert
    await expect(promise).rejects.toThrow();
  });
});
