
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { EmailAlreadyExistsError } from '../errors/user.js';

export class CreateUserUseCase {
  constructor(getUserByEmailRepository, createUserRepository){
    this.getUserByEmailRepository = getUserByEmailRepository;
    this.createUserRepository = createUserRepository;
  }
  async execute(createUserParams){
    

    const userAlreadyExists = await this.getUserByEmailRepository.execute(createUserParams.email);

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
 
    const createUser = await this.createUserRepository.execute(user)

    return createUser;
  }
}