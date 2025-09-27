import { checkIfAmountIsValid, checkIfTypeIsValid } from '../helpers/transaction.js';
import { badRequest, checkIfUserIdIsValid, created, internalServer, invalidIdResponse, requiredFieldIsMissingResponse, validateRequiredFids } from './../helpers/index.js';
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
        return requiredFieldIsMissingResponse(missingField);
      }

      const userIdIsValid = checkIfUserIdIsValid(params.userId);

      if(!userIdIsValid){
        return invalidIdResponse();
      }

      const amountIsValid = checkIfAmountIsValid(params.amount);
       
       if(!amountIsValid){
        return badRequest({message: 'The amount is invalid.'});
       }
       const type = params.type.trim().toUpperCase();
       const typeIsValid = checkIfTypeIsValid(type);
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