import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';
import { EmailAlreadyExistsError } from '../../errors/user';
import { UpdateUserUseCase } from './update-user';

describe('UpdateUserUseCase', () => {
  const user = {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({
      length: 7,
    }),
  };

  class GetUserByEmailRepositoryStub {
    async execute() {
      return null;
    }
  }

  class PasswordHasherAdapterStub {
    async execute() {
      return 'hashed_password';
    }
  }

  class updateUserRepositoryStub {
    async execute() {
      return user;
    }
  }

  const makeSut = () => {
    const getUserByEmailRepository = new GetUserByEmailRepositoryStub();
    const updateUserRepository = new updateUserRepositoryStub();
    const passwordHasherAdapter = new PasswordHasherAdapterStub();
    const sut = new UpdateUserUseCase(
      getUserByEmailRepository,
      updateUserRepository,
      passwordHasherAdapter,
    );

    return {
      sut,
      getUserByEmailRepository,
      updateUserRepository,
      passwordHasherAdapter,
    };
  };
  it('should update user information successfully', async () => {
    // Arrange

    const { sut } = makeSut();
    // Act
    const result = await sut.execute(faker.string.uuid(), {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
    });

    // Assert
    expect(result).toBe(user);
  });

  it('should update user successfully with email', async () => {
    // Arrange
    const email = faker.internet.email();
    const { sut, getUserByEmailRepository } = makeSut();
    const getUserByEmailRepositorySpy = jest.spyOn(
      getUserByEmailRepository,
      'execute',
    );
    // Act
    const result = await sut.execute(faker.string.uuid(), {
      email,
    });
    // Assert
    expect(result).toBe(user);
    expect(getUserByEmailRepositorySpy).toHaveBeenCalledWith(email);
  });

  it('should update user successfully with password', async () => {
    // Arrange
    const password = faker.internet.password({
      length: 7,
    });
    const { sut, passwordHasherAdapter } = makeSut();
    const passwordHasherAdapterSpy = jest.spyOn(
      passwordHasherAdapter,
      'execute',
    );
    // Act
    const result = await sut.execute(faker.string.uuid(), {
      password,
    });
    // Assert
    expect(result).toBe(user);
    expect(passwordHasherAdapterSpy).toHaveBeenCalledWith(password);
  });

  it('should throw EmailInUseError if email is already in use', async () => {
    // Arrange
    const email = faker.internet.email();
    const { sut, getUserByEmailRepository } = makeSut();
    jest.spyOn(getUserByEmailRepository, 'execute').mockResolvedValueOnce(user);
    // Act
    const promise = sut.execute(faker.string.uuid(), {
      email,
    });

    // Assert
    await expect(promise).rejects.toThrow(new EmailAlreadyExistsError(email));
  });

  it('should call updateUserRepository with correct params', async () => {
    // Arrange
    const { sut, updateUserRepository } = makeSut();
    const updateUserRepositorySpy = jest.spyOn(updateUserRepository, 'execute');
    // Act
    await sut.execute(user.id, {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
    });

    // Assert
    expect(updateUserRepositorySpy).toHaveBeenCalledWith(user.id, {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: 'hashed_password',
    });
  });

  it('should throw if GetUserByEmailRepository throws', async () => {
    // Arrange
    const { sut, getUserByEmailRepository } = makeSut();
    jest
      .spyOn(getUserByEmailRepository, 'execute')
      .mockRejectedValueOnce(new Error());
    // Act
    const promise = sut.execute(faker.string.uuid(), {
      email: faker.internet.email(),
    });

    // Assert
    await expect(promise).rejects.toThrow();
  });

  it('should throw if PasswordHasherAdapter throws', async () => {
    // Arrange
    const { sut, passwordHasherAdapter } = makeSut();
    jest
      .spyOn(passwordHasherAdapter, 'execute')
      .mockRejectedValueOnce(new Error());
    // Act
    const promise = sut.execute(faker.string.uuid(), {
      password: user.password,
    });

    // Assert
    await expect(promise).rejects.toThrow();
  });
});
