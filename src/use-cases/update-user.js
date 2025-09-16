import bcrypt from 'bcrypt';
import { EmailAlreadyExistsError } from "../errors/user.js";
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/get-user-by-email.js";
import { PostgresUpdateUserRepository } from '../repositories/postgres/update-user';

export class UpdateUserUseCase{
  async execute(userId, updateUserParams){
    if(updateUserParams.email){
      const postgresGetUserByEmailRepository = new PostgresGetUserByEmailRepository();
      const existingUser = await postgresGetUserByEmailRepository.execute(updateUserParams.email);
      if(existingUser){
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