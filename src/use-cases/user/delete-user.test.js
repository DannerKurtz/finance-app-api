import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';
import { DeleteUserUseCase } from './delete-user';

describe('DeleteUserUseCase', () => {
  const user = {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({
      length: 7,
    }),
  };
  class DeleteUserRepositoryStub {
    async execute() {
      return user;
    }
  }
  const makeSut = () => {
    const deleteUserRepository = new DeleteUserRepositoryStub();
    const sut = new DeleteUserUseCase(deleteUserRepository);

    return {
      deleteUserRepository,
      sut,
    };
  };
  it('should successfully delete a user', async () => {
    //arrange
    const { sut } = makeSut();
    //act
    const result = await sut.execute(faker.string.uuid());
    //assert
    expect(result).toEqual(user);
  });

  it('should call DeleteUserRepository with correct params', async () => {
    //arrange
    const userId = faker.string.uuid();
    const { deleteUserRepository, sut } = makeSut();
    const deleteUserRepositorySpy = jest.spyOn(deleteUserRepository, 'execute');
    //act
    await sut.execute(userId);
    //assert
    expect(deleteUserRepositorySpy).toHaveBeenCalledWith(userId);
  });
});
