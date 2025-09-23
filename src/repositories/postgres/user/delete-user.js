import { PostgresHelper } from "../../../database/postgres/helper-postgres.js";

export class PostgresDeleteUserRepository {
  async execute(id) {
    const deletedUser = await PostgresHelper.query(`
      DELETE FROM users
      WHERE id = $1
      RETURNING *
    `, [id]);
    return deletedUser[0];
  }
}