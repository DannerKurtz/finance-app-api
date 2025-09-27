import validator from 'validator';
import { badRequest, checkIfUserIdIsValid, created, internalServer, invalidIdResponse, validateRequiredFids } from './../helpers/index.js';
export class CreateTransactionController {
  constructor(crateTransactionUseCase){
    this.createTransactionUseCase = crateTransactionUseCase
  }
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;
      const requiredFields = ['userId', 'name', 'amount', 'date', 'type'];
      
      const {missingField, ok: requireFieldsWereProvided} = validateRequiredFids(params, requiredFields);

      if(!requireFieldsWereProvided){
        return badRequest({message: `The field ${missingField} is required.`});
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
        allow_decimal: true,
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

        const transaction = await this.createTransactionUseCase.execute({...params, type});
        
        return created({transaction});
    } catch (error) {
      console.error(error);
      return internalServer()
    }
  }
}