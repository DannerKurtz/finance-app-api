import { EmailAlreadyExistsError } from '../../errors/user.js';

export class CreateUserUseCase {
  constructor(
    getUserByEmailRepository,
    createUserRepository,
    passwordHasherAdapter,
    idGeneratorAdapter,
  ) {
    this.getUserByEmailRepository = getUserByEmailRepository;
    this.createUserRepository = createUserRepository;
    this.passwordHasherAdapter = passwordHasherAdapter;
    this.idGeneratorAdapter = idGeneratorAdapter;
  }
  async execute(createUserParams) {
    const userAlreadyExists = await this.getUserByEmailRepository.execute(
      createUserParams.email,
    );

    if (userAlreadyExists) {
      throw new EmailAlreadyExistsError(createUserParams.email);
    }
    // gerar Id do usuário;
    const userId = await this.idGeneratorAdapter.execute();

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
