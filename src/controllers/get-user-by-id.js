import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
import { internalServer, notFound, ok } from "./helpers/http.js";
import { checkIfUserIdIsValid, invalidIdResponse } from "./helpers/user.js";

export class GetUserByIdController{
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      
      if(!userId && checkIfUserIdIsValid(userId)){
        return invalidIdResponse();
      }

      const getUserByIdUseCase = new GetUserByIdUseCase();
      const user = await getUserByIdUseCase.execute(userId);

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