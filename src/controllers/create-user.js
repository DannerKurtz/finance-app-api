import validator from 'validator';
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
          body: {
            errorMessage: `The field ${field} is required.`
          },
        };
      }

      if(params['password'].length < 6){
        return {
          statusCode: 400,
          body: {
            errorMessage: 'The password must be at least 6 characters long.'
          },
        };
      }

      const emailIsValid = validator.isEmail(params['email']);
      if(!emailIsValid){
        return {
          statusCode: 400,
          body: { 
            errorMessage: 'E-mail is invalid. Add a valid e-mail.'
          },
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
