import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';
import { EmailAlreadyExistsError } from '../../errors/user';
import { CreateUserUseCase } from './create-user';

describe('Create User Use Case', () => {
  const makeSut = () => {
    class GetUserByEmailRepositoryStub {
      async execute() {
        return null;
      }
    }
    class CreateUserRepositoryStub {
      async execute(user) {
        return user;
      }
    }
    class PasswordHasherAdapterStub {
      async execute() {
        return 'hashed_password';
      }
    }
    class IdGeneratorAdapterStub {
      async execute() {
        return 'id_generator';
      }
    }

    const getUserByEmailRepository = new GetUserByEmailRepositoryStub();
    const createUserRepository = new CreateUserRepositoryStub();
    const passwordHasherAdapter = new PasswordHasherAdapterStub();
    const idGeneratorAdapter = new IdGeneratorAdapterStub();
    const sut = new CreateUserUseCase(
      getUserByEmailRepository,
      createUserRepository,
      passwordHasherAdapter,
      idGeneratorAdapter,
    );

    return {
      sut,
      getUserByEmailRepository,
      createUserRepository,
      passwordHasherAdapter,
      idGeneratorAdapter,
    };
  };
  const user = {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({
      length: 7,
    }),
  };
  it('should successfully create a user', async () => {
    //arrange
    const { sut } = makeSut();
    //act
    const createdUser = sut.execute(user);
    //assert
    expect(createdUser).toBeTruthy();
  });

  it('should throws an EmailAlreadyInUseError if GetUserByEmailRepository returns a user', async () => {
    //arrange
    const { sut, getUserByEmailRepository } = makeSut();
    jest.spyOn(getUserByEmailRepository, 'execute').mockReturnValue(user);
    //act

    const promise = sut.execute(user);
    //assert
    await expect(promise).rejects.toThrow(
      new EmailAlreadyExistsError(user.email),
    );
  });
  it('should call IdGeneratorAdapter to generate a random uuid and call with PasswordHashed', async () => {
    //arrange
    const {
      sut,
      idGeneratorAdapter,
      createUserRepository,
      passwordHasherAdapter,
    } = makeSut();
    const idGeneratorSpy = jest.spyOn(idGeneratorAdapter, 'execute');
    const createUserRepositorySpy = jest.spyOn(createUserRepository, 'execute');
    const passwordHasherAdapterSpy = jest.spyOn(
      passwordHasherAdapter,
      'execute',
    );
    //act
    await sut.execute(user);
    //assert
    expect(idGeneratorSpy).toHaveBeenCalled();
    expect(passwordHasherAdapterSpy).toHaveBeenCalled();
    expect(createUserRepositorySpy).toHaveBeenCalledWith({
      ...user,
      id: 'id_generator',
      password: 'hashed_password',
    });
  });
});
