import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
import { badRequest, internalServer, notFound, ok } from "./helpers.js";

export class GetUserByIdController{
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      
      if(!userId){
        return badRequest({message: 'The user id is required.'});
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