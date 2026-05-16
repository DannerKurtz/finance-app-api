import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';
import { UserNotFoundError } from '../../errors/user.js';
import { GetTransactionsByUserIdUseCase } from './get-transactions-by-user-id.js';
describe('Get Transactions by User ID Use Case', () => {
  const user = {
    id: faker.string.uuid(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({
      length: 8,
    }),
  };
  class GetTransactionByUserIdRepositoryStub {
    async execute() {
      return [];
    }
  }

  class GetUserByIdStub {
    async execute() {
      return user;
    }
  }

  const makeSut = () => {
    const getTransactionByUserIdRepository =
      new GetTransactionByUserIdRepositoryStub();
    const getUserByIdRepository = new GetUserByIdStub();
    const sut = new GetTransactionsByUserIdUseCase(
      getTransactionByUserIdRepository,
      getUserByIdRepository,
    );
    return {
      sut,
      getTransactionByUserIdRepository,
      getUserByIdRepository,
    };
  };

  it('should get transactions by user id successfully', async () => {
    // Arrange
    const { sut } = makeSut();
    const userId = faker.string.uuid();
    // Act
    const result = await sut.execute(userId);
    // Assert
    expect(result).toEqual([]);
  });

  it('should throw an error if user is not found', async () => {
    // Arrange
    const { sut, getUserByIdRepository } = makeSut();
    const userId = faker.string.uuid();
    jest.spyOn(getUserByIdRepository, 'execute').mockResolvedValueOnce(null);
    // Act
    const promise = sut.execute(userId);
    // Assert
    await expect(promise).rejects.toThrow(new UserNotFoundError(userId));
  });

  it('should call GetUserByIdRepository with correct params', async () => {
    // Arrange
    const { sut, getUserByIdRepository } = makeSut();
    const userId = faker.string.uuid();
    const getUserByIdSpy = jest.spyOn(getUserByIdRepository, 'execute');
    // Act
    await sut.execute(userId);
    // Assert
    expect(getUserByIdSpy).toHaveBeenCalledWith(userId);
  });
});
