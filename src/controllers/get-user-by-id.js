import { PostgresGetUserByIdRepository } from "../repositories/postgres/get-user-by-id";
import { badRequest, internalServer, ok } from "./helpers.js";

export class GetUserByIdController{
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.id;
      
      if(!userId){
        return badRequest({message: 'The user id is required.'});
      }

      const user = await PostgresGetUserByIdRepository.execute(userId);

      return ok({user});
      
    } catch (error) {
      console.error(error);
      return internalServer();
    }
  }
}