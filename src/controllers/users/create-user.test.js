import { CreateUserController } from './create-user';

describe('Create User Controller', () => {
  class CreateUserUseCaseStub {
    execute(user) {
      return user;
    }
  }
  it('should return 201 when creating user successfully', async () => {
    //arrange
    const createUserUseCaseStub = new CreateUserUseCaseStub();
    const createUserController = new CreateUserController(
      createUserUseCaseStub,
    );
    const httpRequest = {
      body: {
        first_name: 'Jhon',
        last_name: 'Doe',
        email: 'Doe.Jhon@exemple.com',
        password: '1a25sr7',
      },
    };

    //act
    const result = await createUserController.execute(httpRequest);

    //assert
    expect(result.statusCode).toBe(201);
    expect(result.body).not.toBeUndefined();
    expect(result.body).not.toBeNull();
  });

  it('should return 400 if first_name is not provided', async () => {
    //arrange
    const createUserUseCaseStub = new CreateUserUseCaseStub();
    const createUserController = new CreateUserController(
      createUserUseCaseStub,
    );
    const httpRequest = {
      body: {
        last_name: 'Doe',
        email: 'Doe.Jhon@exemple.com',
        password: '1a25sr7',
      },
    };

    //act
    const result = await createUserController.execute(httpRequest);

    //assert
    expect(result.statusCode).toBe(400);
  });

  it('should return 400 if last_name is not provided', async () => {
    //arrange
    const createUserUseCaseStub = new CreateUserUseCaseStub();
    const createUserController = new CreateUserController(
      createUserUseCaseStub,
    );
    const httpRequest = {
      body: {
        first_name: 'Jhon',
        email: 'Doe.Jhon@exemple.com',
        password: '1a25sr7',
      },
    };

    //act
    const result = await createUserController.execute(httpRequest);

    //assert
    expect(result.statusCode).toBe(400);
  });

  it('should return 400 if email is not provided', async () => {
    //arrange
    const createUserUseCaseStub = new CreateUserUseCaseStub();
    const createUserController = new CreateUserController(
      createUserUseCaseStub,
    );
    const httpRequest = {
      body: {
        first_name: 'Jhon',
        last_name: 'Doe',
        password: '1a25sr7',
      },
    };

    //act
    const result = await createUserController.execute(httpRequest);

    //assert
    expect(result.statusCode).toBe(400);
  });

  it('should return 400 error if the email field is not provided correctly.', async () => {
    //arrange
    const createUserUseCaseStub = new CreateUserUseCaseStub();
    const createUserController = new CreateUserController(
      createUserUseCaseStub,
    );
    const httpRequest = {
      body: {
        first_name: 'Jhon',
        last_name: 'Doe',
        email: 'Doe.exemple.com',
        password: '1a25sr7',
      },
    };

    //act
    const result = await createUserController.execute(httpRequest);

    //assert
    expect(result.statusCode).toBe(400);
  });

  it('should return 400 if password is not provided', async () => {
    //arrange
    const createUserUseCaseStub = new CreateUserUseCaseStub();
    const createUserController = new CreateUserController(
      createUserUseCaseStub,
    );
    const httpRequest = {
      body: {
        first_name: 'Jhon',
        last_name: 'Doe',
        email: 'Doe.Jhon@exemple.com',
      },
    };

    //act
    const result = await createUserController.execute(httpRequest);

    //assert
    expect(result.statusCode).toBe(400);
  });

  it('should return 400 error if the password field is not provided correctly.', async () => {
    //arrange
    const createUserUseCaseStub = new CreateUserUseCaseStub();
    const createUserController = new CreateUserController(
      createUserUseCaseStub,
    );
    const httpRequest = {
      body: {
        first_name: 'Jhon',
        last_name: 'Doe',
        email: 'Doe.Jhon@exemple.com',
        password: '123',
      },
    };

    //act
    const result = await createUserController.execute(httpRequest);

    //assert
    expect(result.statusCode).toBe(400);
  });

  it('should call CreateUserUseCase with correct params', async () => {
    const createUserUseCase = new CreateUserUseCaseStub();
    const createUserController = new CreateUserController(createUserUseCase);
    const httpRequest = {
      body: {
        first_name: 'Jhon',
        last_name: 'Doe',
        email: 'Doe.Jhon@exemple.com',
        password: '123456798',
      },
    };
    const executeSpy = jest.spyOn(createUserUseCase, 'execute');

    //act
    await createUserController.execute(httpRequest);

    //assert
    expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
    expect(executeSpy).toHaveBeenCalledTimes(1);
  });
});
