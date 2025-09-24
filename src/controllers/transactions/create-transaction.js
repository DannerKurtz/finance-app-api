import { validator } from 'validator';
import { badRequest, checkIfUserIdIsValid, internalServer, invalidIdResponse } from './../helpers/index.js';
export class CreateTransactionController {
  constructor(crateTransactionUseCase){
    this.createTransactionUseCase = crateTransactionUseCase
  }
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;
      const requiredFields = ['id', 'userId', 'name', 'amount', 'date', 'type'];
      
      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().length === 0) {
          return badRequest({message: `The field ${field} is required.`});
        }
      }

      const userIdIsValid = checkIfUserIdIsValid(params.userId);

      if(!userIdIsValid){
        return invalidIdResponse();
      }

      if (params.amount <= 0){
        return badRequest({message: 'The amount must be greater than zero.'});
      }

      const amountIsValid = validator.isCurrency(params.amount.toString(), { 
        digits_after_decimal: [2],
        allow_decimal: false,
        decimal_separator: '.',
       });

       if(!amountIsValid){
        return badRequest({message: 'The amount is invalid.'});
       }
       const type = params.type.trim().toUpperCase();
       const typeIsValid = ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(type);
        if(!typeIsValid){
          return badRequest({message: 'The type is invalid. It must be EARNING, EXPENSE or INVESTMENT.'});
        }

        const transaction = this.createTransactionUseCase.execute({...params, type});

        return transaction;
    } catch (error) {
      console.error(error);
      return internalServer()
    }
  }
}