
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { EmailAlreadyExistsError } from '../errors/user.js';
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js';
import { PostgresCreateUserRepository } from './../repositories/postgres/create-user.js';

export class CreateUserUseCase {
  async execute(createUserParams){
    //TODO: verificar se email já existe;
    const postgresGetUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const userAlreadyExists = await postgresGetUserByEmailRepository.execute(createUserParams.email);

    if(userAlreadyExists){
      throw new EmailAlreadyExistsError(createUserParams.email);
    }
    // gerar Id do usuário;
    const userId = uuid();

    // criptografar senha;
    const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

    // inserir um usuário no banco de dados;
    const user = 
    {
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    }

    // chamar repositório;
    const postgresCreateUserRepository = new PostgresCreateUserRepository()
    const createUser = await postgresCreateUserRepository.execute(user)

    return createUser;
  }
}