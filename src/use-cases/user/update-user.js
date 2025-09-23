import bcrypt from 'bcrypt';
import { EmailAlreadyExistsError } from "../../errors/user.js";

export class UpdateUserUseCase{
  constructor(getUserByEmailRepository, updateUserRepository) {
    this.getUserByEmailRepository = getUserByEmailRepository
    this.updateUserRepository = updateUserRepository
  }
    async execute(userId, updateUserParams){
    if(updateUserParams.email){
      const existingUser = await this.getUserByEmailRepository.execute(updateUserParams.email);
      if(existingUser && existingUser.id !== userId){
        throw new EmailAlreadyExistsError(updateUserParams.email);
      ;
      }
    }
    const user = {
      ...updateUserParams
    }

    if (updateUserParams.password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(updateUserParams.password, saltRounds);
      user.password = hashedPassword;
    }

    const updatedUser = await this.updateUserRepository.execute(userId, user);
    return updatedUser;
  }
}