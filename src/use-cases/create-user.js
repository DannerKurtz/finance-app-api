
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { PostgresCreateUserRepository } from './../repositories/postgres/create-user.js';

export class CreateUserUseCase {
  async execute(createUserParams){
    //TODO: verificar se email já existe;

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