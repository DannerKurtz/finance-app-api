import { DeleteUserUseCase } from "../use-cases/index.js";
import { checkIfUserIdIsValid, internalServer, invalidIdResponse, notFound, ok } from "./helpers/index.js";

export class DeleteUserController{
  async execute(httpRequest) {
      try {
        const userId = httpRequest.params.userId;
        
        if(!userId && checkIfUserIdIsValid(userId)){
          return invalidIdResponse();
        }
  
        const deleteUserUseCase = new DeleteUserUseCase();
        const deletedUser = await deleteUserUseCase.execute(userId);
  
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