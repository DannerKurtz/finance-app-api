import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';
import { UserNotFoundError } from '../../errors/user';
import { CreateTransactionUseCase } from './create-transaction';

describe('CreateTransactionUseCase', () => {
  const createTransactionParams = {
    userId: faker.string.uuid(),
    name: faker.commerce.productName(),
    date: faker.date.anytime().toISOString(),
    type: 'EXPENSE',
    amount: Number(faker.finance.amount()),
  };

  const user = {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({
      length: 7,
    }),
  };
  class CreateTransactionRepositoryStub {
    async execute(transaction) {
      return transaction;
    }
  }

  class IdGeneratorAdapterStub {
    execute() {
      return 'random_id';
    }
  }

  class GetUserByIdRepositoryStub {
    async execute(userId) {
      return { id: userId, ...user };
    }
  }

  const makeSut = () => {
    const createTransactionRepository = new CreateTransactionRepositoryStub();
    const idGeneratorAdapter = new IdGeneratorAdapterStub();
    const getUserByIdRepository = new GetUserByIdRepositoryStub();
    const sut = new CreateTransactionUseCase(
      createTransactionRepository,
      getUserByIdRepository,
      idGeneratorAdapter,
    );

    return {
      sut,
      getUserByIdRepository,
    };
  };
  it('should create transaction successfully', async () => {
    // Arrange
    const { sut } = makeSut();
    // Act
    const result = await sut.execute(createTransactionParams);
    // Assert
    expect(result).toEqual({ ...createTransactionParams, id: 'random_id' });
  });

  it('should call GetUserByIdRepository with correct params', async () => {
    // Arrange
    const { sut, getUserByIdRepository } = makeSut();
    const getUserByIdRepositorySpy = jest.spyOn(
      getUserByIdRepository,
      'execute',
    );
    // Act
    await sut.execute(createTransactionParams);
    // Assert
    expect(getUserByIdRepositorySpy).toHaveBeenCalledWith(
      createTransactionParams.userId,
    );
  });

  it('should call idGeneratorAdapter ', async () => {
    // Arrange
    const { sut } = makeSut();
    const idGeneratorAdapterSpy = jest.spyOn(sut.idGeneratorAdapter, 'execute');
    // Act
    await sut.execute(createTransactionParams);
    // Assert
    expect(idGeneratorAdapterSpy).toHaveBeenCalled();
  });

  it('should call CreateUserRepository with correct params', async () => {
    // Arrange
    const { sut } = makeSut();
    const createTransactionRepositorySpy = jest.spyOn(
      sut.createTransactionRepository,
      'execute',
    );
    // Act
    await sut.execute(createTransactionParams);
    // Assert
    expect(createTransactionRepositorySpy).toHaveBeenCalledWith({
      ...createTransactionParams,
      id: 'random_id',
    });
  });

  it('should throw if user not found', async () => {
    // Arrange
    const { sut, getUserByIdRepository } = makeSut();
    jest.spyOn(getUserByIdRepository, 'execute').mockResolvedValue(null);
    // Act
    const promise = sut.execute(createTransactionParams);
    // Assert
    await expect(promise).rejects.toThrow(
      new Error(UserNotFoundError.message).message,
    );
  });

  it('should throw if CreateTransactionRepository throws', async () => {
    // Arrange
    const { sut } = makeSut();
    jest
      .spyOn(sut.createTransactionRepository, 'execute')
      .mockRejectedValue(new Error('CreateTransactionRepository error'));
    // Act
    const promise = sut.execute(createTransactionParams);
    // Assert
    await expect(promise).rejects.toThrow(
      new Error('CreateTransactionRepository error').message,
    );
  });

  it('should throw if idGeneratorAdapter throws', async () => {
    // Arrange
    const { sut } = makeSut();
    jest.spyOn(sut.idGeneratorAdapter, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });

    // Act
    const promise = sut.execute(createTransactionParams);
    // Assert
    await expect(promise).rejects.toThrow();
  });

  it('should throw if CreateTransactionRepository throws', async () => {
    // Arrange
    const { sut } = makeSut();
    jest
      .spyOn(sut.createTransactionRepository, 'execute')
      .mockImplementationOnce(() => {
        throw new Error();
      });

    // Act
    const promise = sut.execute(createTransactionParams);
    // Assert
    await expect(promise).rejects.toThrow();
  });
});
