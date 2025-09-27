import { EmailAlreadyExistsError } from '../../errors/user.js';
import { badRequest, checkIfEmailIsValid, checkIfPasswordIsValid, created, emailAlreadyExistsResponse, internalServer, invalidPasswordResponse, validateRequiredFids } from '../helpers/index.js';

export class CreateUserController{
  constructor(createUserUseCase){
    this.createUserUseCase = createUserUseCase;
  
  }
  async execute(httpRequest) {
   try {
     const params = httpRequest.body;

    // validar a requisição (campos obrigatórios)
    const requiredFields = ['firstName', 'lastName', 'email', 'password'];

    const {missingField, ok: requireFieldsWereProvided} = validateRequiredFids(params, requiredFields);
    
    if(!requireFieldsWereProvided){
      return badRequest({message: `The field ${missingField} is required.`});
    }

    if(!checkIfPasswordIsValid(params['password'])){
        return invalidPasswordResponse();
      }

      const emailIsValid = checkIfEmailIsValid(params['email']);
      if(!emailIsValid){
        return emailAlreadyExistsResponse()
      }
    // chamar o use case

    const createdUser = await this.createUserUseCase.execute(params);

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
