import { CreateUserController } from '../../controllers';
import { makeCreateUserController } from './user';

describe('User Controller Factory', () => {
  it('should return a valid CreateUserController instance', () => {
    expect(makeCreateUserController()).toBeInstanceOf(CreateUserController);
  });
});
