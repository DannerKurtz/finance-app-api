import validator from 'validator';
import { CreateUserUseCase } from "../use-cases/create-user.js";
import { badRequest, created, internalServer } from './helpers.js';

export class CreateUserController{
  async execute(httpRequest) {
   try {
     const params = httpRequest.body;

    // validar a requisição (campos obrigatórios)
    const requiredFields = ['firstName', 'lastName', 'email', 'password'];

    for (const field of requiredFields) {
      if (!params[field] || params[field].trim().length === 0) {
        return badRequest({message: `The field ${field} is required.`});
      }

      if(params['password'].length < 6){
        return badRequest({message: 'The password must be at least 6 characters long.'});
      }

      const emailIsValid = validator.isEmail(params['email']);
      if(!emailIsValid){
        return badRequest({
          message: 'E-mail is invalid. Add a valid e-mail.'
        }) 
      }
    }

    // chamar o use case
    const createUserUseCase = new CreateUserUseCase();
    const createdUser = await createUserUseCase.execute(params);

    // retornar a resposta
    return created({createdUser});
  
   } catch (error) {
    console.error(error);
    return internalServer();
    }
   }
  }
