import { UserNotFoundError } from "../../errors/user.js";
import { badRequest, checkIfIdIsValid, internalServer, invalidIdResponse, ok, requiredFieldIsMissingResponse } from "../helpers/index.js";

export class GetTransactionsByUserIdController {
  constructor(getTransactionsByUserIdUseCase){
    this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase
  }
  async execute(httpRequest){
   try {
     const {userId} = httpRequest.query;
    if(!userId){
      return requiredFieldIsMissingResponse('userId');
    }
    const checkUserId = checkIfIdIsValid(userId);
    if(!checkUserId){
      return invalidIdResponse(userId);
    }

    const getTransactionsByUserId = await this.getTransactionsByUserIdUseCase.execute(userId);
    return ok(getTransactionsByUserId); 
   } catch (error) {
    console.error(error);
    if(error instanceof UserNotFoundError){
      return badRequest({message: error.message});
    }
    return internalServer()
   }
  }
}