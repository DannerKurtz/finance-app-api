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
});
