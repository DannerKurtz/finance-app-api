import { faker } from '@faker-js/faker';
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
});
