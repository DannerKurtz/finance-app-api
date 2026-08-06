import {
  CreateUserController,
  GetUserBalanceController,
  GetUserByIdController,
  UpdateUserController,
} from '../../controllers';
import {
  makeCreateUserController,
  makeGetUserBalanceController,
  makeGetUserByIdController,
  makeUpdateUserController,
} from './user';

describe('User Controller Factory', () => {
  it('should return a valid CreateUserController instance', () => {
    expect(makeCreateUserController()).toBeInstanceOf(CreateUserController);
  });

  it('should return a valid UpdateUserController instance', () => {
    expect(makeUpdateUserController()).toBeInstanceOf(UpdateUserController);
  });

  it('should return a valid GetUserByIdController instance', () => {
    expect(makeGetUserByIdController()).toBeInstanceOf(GetUserByIdController);
  });

  it('should return a valid GetUserBalanceController instance', () => {
    expect(makeGetUserBalanceController()).toBeInstanceOf(
      GetUserBalanceController,
    );
  });
});
