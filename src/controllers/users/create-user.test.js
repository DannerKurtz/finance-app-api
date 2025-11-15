import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';
import { EmailAlreadyExistsError } from '../../errors/user.js';
import { CreateUserController } from './create-user.js';

describe('Create User Controller', () => {
  class CreateUserUseCaseStub {
    execute(user) {
      return user;
    }
  }

  const makeSut = () => {
    const createUserUseCase = new CreateUserUseCaseStub();
    const sut = new CreateUserController(createUserUseCase);

    return {
      sut,
      createUserUseCase,
    };
  };

  const httpRequest = {
    body: {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password({
        length: 7,
      }),
    },
  };
  it('should return 201 when creating user successfully', async () => {
    //arrange
    const { sut } = makeSut();

    //act
    const result = await sut.execute(httpRequest);

    //assert
    expect(result.statusCode).toBe(201);
    expect(result.body).not.toBeUndefined();
    expect(result.body).not.toBeNull();
  });

  it('should return 400 if first_name is not provided', async () => {
    //arrange
    const { sut } = makeSut();

    //act
    const result = await sut.execute({
      body: { ...httpRequest.body, first_name: undefined },
    });

    //assert
    expect(result.statusCode).toBe(400);
  });

  it('should return 400 if last_name is not provided', async () => {
    //arrange
    const { sut } = makeSut();

    //act
    const result = await sut.execute({
      body: { ...httpRequest.body, last_name: undefined },
    });

    //assert
    expect(result.statusCode).toBe(400);
  });

  it('should return 400 if email is not provided', async () => {
    //arrange
    const { sut } = makeSut();

    //act
    const result = await sut.execute({
      body: { ...httpRequest.body, email: undefined },
    });

    //assert
    expect(result.statusCode).toBe(400);
  });

  it('should return 400 error if the email field is not provided correctly.', async () => {
    //arrange
    const { sut } = makeSut();

    //act
    const result = await sut.execute({
      body: { ...httpRequest.body, email: 'Doe.exemple.com' },
    });

    //assert
    expect(result.statusCode).toBe(400);
  });

  it('should return 400 if password is not provided', async () => {
    //arrange
    const { sut } = makeSut();

    //act
    const result = await sut.execute({
      body: { ...httpRequest.body, password: undefined },
    });

    //assert
    expect(result.statusCode).toBe(400);
  });

  it('should return 400 error if the password field is not provided correctly.', async () => {
    //arrange
    const { sut } = makeSut();

    //act
    const result = await sut.execute({
      body: { ...httpRequest.body, password: '123' },
    });

    //assert
    expect(result.statusCode).toBe(400);
  });

  it('should call CreateUserUseCase with correct params', async () => {
    const { sut, createUserUseCase } = makeSut();

    const executeSpy = jest.spyOn(createUserUseCase, 'execute');

    //act
    await sut.execute(httpRequest);

    //assert
    expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
    expect(executeSpy).toHaveBeenCalledTimes(1);
  });

  it('should return 500 if CreateUserCase throws', async () => {
    //arrange
    const { sut, createUserUseCase } = makeSut();

    jest.spyOn(createUserUseCase, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });

    //act
    const result = await sut.execute(httpRequest);

    //assert
    expect(result.statusCode).toBe(500);
  });

  it('should returns 400 if CreateUserUseCase throws EmailAlreadyInUseError', async () => {
    //arrange
    const { sut, createUserUseCase } = makeSut();

    jest.spyOn(createUserUseCase, 'execute').mockImplementationOnce(() => {
      throw new EmailAlreadyExistsError(httpRequest.body.email);
    });

    //act
    const result = await sut.execute(httpRequest);

    //assert
    expect(result.statusCode).toBe(400);
  });
});
