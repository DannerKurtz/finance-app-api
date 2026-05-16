import { faker } from '@faker-js/faker';
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
});
