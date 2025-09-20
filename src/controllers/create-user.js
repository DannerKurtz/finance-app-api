import { EmailAlreadyExistsError } from '../errors/user.js';
import { CreateUserUseCase } from "../use-cases/index.js";
import { badRequest, checkIfEmailIsValid, checkIfPasswordIsValid, created, emailAlreadyExistsResponse, internalServer, invalidPasswordResponse } from './helpers/index.js';

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

      if(!checkIfPasswordIsValid(params['password'])){
        return invalidPasswordResponse();
      }

      const emailIsValid = checkIfEmailIsValid(params['email']);
      if(!emailIsValid){
        return emailAlreadyExistsResponse()
      }
    }

    // chamar o use case
    const createUserUseCase = new CreateUserUseCase();
    const createdUser = await createUserUseCase.execute(params);

    // retornar a resposta
    return created({createdUser});
  
   } catch (error) {
    if(error instanceof EmailAlreadyExistsError){
      return badRequest({message: error.message});
    }

    console.error(error);
    return internalServer();
    }
   }
  }
