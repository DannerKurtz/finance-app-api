import z from 'zod';
import { EmailAlreadyExistsError } from '../../errors/user.js';
import { updateUserSchema } from '../../schemas/index.js';
import { badRequest, checkIfIdIsValid, internalServer, invalidIdResponse, ok } from '../helpers/index.js';

export class UpdateUserController{
  constructor(updateUserUseCase){
this.updateUserUseCase = updateUserUseCase
  }
  async execute(httpRequest){
    try {
    const params = httpRequest.body;
    const userId = httpRequest.params.userId;

    if(!checkIfIdIsValid(userId)){
      return invalidIdResponse();
    }

    await z.parseAsync(updateUserSchema, params);

    const updatedUser = await this.updateUserUseCase.execute(userId, params);

    return ok({updatedUser});
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
