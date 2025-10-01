import z from 'zod';
import { EmailAlreadyExistsError } from '../../errors/user.js';
import { createUserSchema } from '../../schemas/index.js';
import { badRequest, created, internalServer } from '../helpers/index.js';

export class CreateUserController{
  constructor(createUserUseCase){
    this.createUserUseCase = createUserUseCase;
  
  }
  async execute(httpRequest) {
   try {
     const params = httpRequest.body;

    
    await z.parseAsync(createUserSchema, params);

    const createdUser = await this.createUserUseCase.execute(params);

    // retornar a resposta
    return created({createdUser});
  
   } catch (error) {
    if(error instanceof z.ZodError){
      return badRequest({message: error.issues[0].message});
    }

    if(error instanceof EmailAlreadyExistsError){
      return badRequest({message: error.message});
    }

    console.error(error);
    return internalServer();
    }
   }
  }
