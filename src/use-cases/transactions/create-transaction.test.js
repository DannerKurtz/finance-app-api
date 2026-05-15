import { faker } from '@faker-js/faker';
import { CreateTransactionUseCase } from './create-transaction';

describe('CreateTransactionUseCase', () => {
  const createTransactionParams = {
    user_id: faker.string.uuid(),
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
});
