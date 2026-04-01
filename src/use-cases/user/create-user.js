import { v4 as uuid } from 'uuid';
import { EmailAlreadyExistsError } from '../../errors/user.js';

export class CreateUserUseCase {
  constructor(
    getUserByEmailRepository,
    createUserRepository,
    passwordHasherAdapter,
  ) {
    this.getUserByEmailRepository = getUserByEmailRepository;
    this.createUserRepository = createUserRepository;
    this.passwordHasherAdapter = passwordHasherAdapter;
  }
  async execute(createUserParams) {
    const userAlreadyExists = await this.getUserByEmailRepository.execute(
      createUserParams.email,
    );

    if (userAlreadyExists) {
      throw new EmailAlreadyExistsError(createUserParams.email);
    }
    // gerar Id do usuário;
    const userId = uuid();

    // criptografar senha;
    const hashedPassword = await this.passwordHasherAdapter.execute(
      createUserParams.password,
    );

    // inserir um usuário no banco de dados;
    const user = {
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    };

    // chamar repositório;

    const createUser = await this.createUserRepository.execute(user);

    return createUser;
  }
}
