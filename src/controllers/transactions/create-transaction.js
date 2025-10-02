import z from 'zod';
import { createTransactionSchema } from '../../schemas/index.js';
import { badRequest, created, internalServer } from './../helpers/index.js';
export class CreateTransactionController {
  constructor(crateTransactionUseCase){
    this.createTransactionUseCase = crateTransactionUseCase
  }
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      await z.parseAsync(createTransactionSchema, params)

        const transaction = await this.createTransactionUseCase.execute({...params});
        
        return created({transaction});
    } catch (error) {
      if(error instanceof z.ZodError){
        return badRequest({message: error.issues[0].message});
      }
      console.error(error);
      return internalServer()
    }
  }
}