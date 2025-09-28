import { badRequest, checkIfAmountIsValid, checkIfIdIsValid, checkIfTypeIsValid, internalServer, invalidAmountResponse, invalidIdResponse, invalidTypeResponse, ok } from './../helpers/index.js';

export class UpdateTransactionController{
  constructor(updateTransactionUseCase){
    this.updateTransactionUseCase = updateTransactionUseCase;
  }
  async execute(httpRequest){
    try {
      const idIsValid = checkIfIdIsValid(httpRequest.params.transactionId);
      if(!idIsValid){
        return invalidIdResponse();
      }

      const params = httpRequest.body

      const allowFields = ['name', 'amount', 'date', 'type'];
      
      const someFieldsIsNotAllowed = Object.keys(params).some(field => !allowFields.includes(field));

      if(someFieldsIsNotAllowed){
        return badRequest({message: 'Some fields are not allowed'});
      }

      if(params.amount){
        const amountIsValid = checkIfAmountIsValid(params.amount);
        if(!amountIsValid){
          return invalidAmountResponse();
        }
      }

      if(params.type){
        const typeIsValid = checkIfTypeIsValid(params.type);
        if(!typeIsValid){
          return invalidTypeResponse();
        }
      }
      
      const transaction = await this.updateTransactionUseCase.execute(httpRequest.params.transactionId, params);
      return ok(transaction);
    } catch (error) {
      console.error(error);
      return internalServer()
    }
  }
}