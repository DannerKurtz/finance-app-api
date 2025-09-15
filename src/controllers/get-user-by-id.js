import { PostgresGetUserByIdRepository } from "../repositories/postgres/get-user-by-id.js";
import { badRequest, internalServer, ok } from "./helpers.js";

export class GetUserByIdController{
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      
      if(!userId){
        return badRequest({message: 'The user id is required.'});
      }

      const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();

      const user = await postgresGetUserByIdRepository.execute(userId);

      return ok({user});

    } catch (error) {
      console.error(error);
      return internalServer();
    }
  }
}