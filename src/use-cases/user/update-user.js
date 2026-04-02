import { EmailAlreadyExistsError } from '../../errors/user.js';

export class UpdateUserUseCase {
  constructor(
    getUserByEmailRepository,
    updateUserRepository,
    passwordHasherAdapter,
  ) {
    this.getUserByEmailRepository = getUserByEmailRepository;
    this.updateUserRepository = updateUserRepository;
    this.passwordHasherAdapter = passwordHasherAdapter;
  }
  async execute(userId, updateUserParams) {
    if (updateUserParams.email) {
      const existingUser = await this.getUserByEmailRepository.execute(
        updateUserParams.email,
      );
      if (existingUser && existingUser.id !== userId) {
        throw new EmailAlreadyExistsError(updateUserParams.email);
      }
    }
    const user = {
      ...updateUserParams,
    };

    if (updateUserParams.password) {
      const hashedPassword = await this.passwordHasherAdapter.execute(
        updateUserParams.password,
      );
      user.password = hashedPassword;
    }

    const updatedUser = await this.updateUserRepository.execute(userId, user);
    return updatedUser;
  }
}
