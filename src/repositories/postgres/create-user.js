import { PostgresHelper } from "../../database/postgres/helper-postgres";


export class PostgresCreateUserRepository {
  async execute(createUserParams){
    const results = await PostgresHelper.query(
      'INSERT INTO users (id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) ', 
    [
      createUserParams.id, 
      createUserParams.firstName, 
      createUserParams.lastName, 
      createUserParams.email, 
      createUserParams.password
    ]
    );
    return results[0];
  }
}