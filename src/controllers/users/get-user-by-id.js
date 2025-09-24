import { checkIfUserIdIsValid, internalServer, invalidIdResponse, notFound, ok } from "../helpers/index.js";

export class GetUserByIdController{
  constructor(getUserByIdUseCase){
    this.getUserByIdUseCase = getUserByIdUseCase;
  
  }
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      
      if(!userId && checkIfUserIdIsValid(userId)){
        return invalidIdResponse();
      }
      const user = await this.getUserByIdUseCase.execute(userId);

      if(!user){
        return notFound({message: 'User not found.'});
      }

      return ok({user});
    } catch (error) {
      
      console.error(error);
      return internalServer();
    }
  }
}