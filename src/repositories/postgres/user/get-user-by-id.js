import { PostgresHelper } from "../../../database/postgres/helper-postgres.js";

export class PostgresGetUserByIdRepository {
  async execute(userId){
    const user = await PostgresHelper.query(
          'SELECT id, first_name, last_name, email, password FROM users WHERE id = $1',
          [userId]
        
        )
    return user[0];
  }
}