import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';
import { GetUserByIdUseCase } from './get-user-by-id';

describe('Get User By Id Use Case', () => {
  const user = {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({
      length: 7,
    }),
  };
  class RetUserByIdRepositoryStub {
    async execute() {
      return user;
    }
  }
  const makeSut = () => {
    const getUserByIdRepository = new RetUserByIdRepositoryStub();
    const sut = new GetUserByIdUseCase(getUserByIdRepository);

    return {
      sut,
      getUserByIdRepository,
    };
  };
  it('should get user by id successfully', async () => {
    // Arrange
    const { sut } = makeSut();
    // Act
    const result = await sut.execute();

    // Assert
    expect(result).toBe(user);
  });

  it('should call GetUserByIdRepository with correct values', async () => {
    // Arrange
    const { sut, getUserByIdRepository } = makeSut();
    const executeSpy = jest.spyOn(getUserByIdRepository, 'execute');
    const userId = faker.string.uuid();
    // Act
    await sut.execute(userId);

    // Assert
    expect(executeSpy).toHaveBeenCalledWith(userId);
  });
});
