import bcrypt from 'bcrypt';
import { EmailAlreadyExistsError } from "../errors/user.js";
import { PostgresGetUserByEmailRepository, PostgresUpdateUserRepository } from "../repositories/postgres/index.js";

export class UpdateUserUseCase{
  async execute(userId, updateUserParams){
    if(updateUserParams.email){
      const postgresGetUserByEmailRepository = new PostgresGetUserByEmailRepository();
      const existingUser = await postgresGetUserByEmailRepository.execute(updateUserParams.email);
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

    const postgresUpdateUserRepository = new PostgresUpdateUserRepository();
    const updatedUser = await postgresUpdateUserRepository.execute(userId, user);
    return updatedUser;
  }
}