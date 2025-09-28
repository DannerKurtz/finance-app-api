import { checkIfIdIsValid, internalServer, invalidIdResponse, notFound, ok } from "../helpers/index.js";

export class DeleteUserController{
  constructor(deleteUserUseCase){
    this.deleteUserUseCase = deleteUserUseCase;
  }
  async execute(httpRequest) {
      try {
        const userId = httpRequest.params.userId;
        
        if(!userId && checkIfIdIsValid(userId)){
          return invalidIdResponse();
        }

        const deletedUser = await this.deleteUserUseCase.execute(userId);
  
        if(!deletedUser){
          return notFound({message: 'User not found.'});
        }
  
        return ok({deletedUser});
  
      } catch (error) {
        console.error(error);
        return internalServer();
      }
    }
}