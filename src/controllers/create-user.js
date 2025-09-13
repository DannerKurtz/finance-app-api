import { CreateUserUseCase } from "../use-cases/create-user.js";


export class CreateUserController{
  async execute(httpRequest) {
   try {
     const params = httpRequest.body;

    // validar a requisição (campos obrigatórios)
    const requiredFields = ['firstName', 'lastName', 'email', 'password'];
    for (const field of requiredFields) {
      if (!params[field] || params[field].trim().length === 0) {
        return {
          statusCode: 400,
          body: `O campo ${field} é obrigatório.`,
        };
      }
    }

    // chamar o use case
    const createUserUseCase = new CreateUserUseCase();
    const createdUser = await createUserUseCase.execute(params);

    // retornar a resposta
    return {
      statusCode: 201,
      body: createdUser,
    };
  
   } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: {errorMessage: 'Internal error server.'},
    };
    }
   }
  }
