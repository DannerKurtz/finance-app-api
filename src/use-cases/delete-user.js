import { PostgresDeleteUserRepository } from "../repositories/postgres";

export class DeleteUserRepository {
  async execute(userId) {
      const postgresDeleteUserRepository = new PostgresDeleteUserRepository();
  
        const deletedUser = await postgresDeleteUserRepository.execute(userId);

        return deletedUser;
    }
}
