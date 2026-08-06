import { CreateUserController, UpdateUserController } from '../../controllers';
import { makeCreateUserController, makeUpdateUserController } from './user';

describe('User Controller Factory', () => {
  it('should return a valid CreateUserController instance', () => {
    expect(makeCreateUserController()).toBeInstanceOf(CreateUserController);
  });

  it('should return a valid UpdateUserController instance', () => {
    expect(makeUpdateUserController()).toBeInstanceOf(UpdateUserController);
  });
});
