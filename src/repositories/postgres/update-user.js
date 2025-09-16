import { PostgresHelper } from '../../database/postgres/helper-postgres.js';

export class PostgresUpdateUserRepository {
  async execute(userId, updateUserParams) {
    const updateFilds = [];
    const updateValues = [];

    Object.keys(updateUserParams).forEach((key, index) => {
      updateFilds.push(`${key} = $${index + 1}`);
      updateValues.push(updateUserParams[key]);
    });
    updateValues.push(userId);
    
    const updateQuery = `
      UPDATE users
      SET ${updateFilds.join(', ')}
      WHERE id = $${updateValues.length}
      RETURNING id, name, email, created_at
    `;

    const updateUserQuery = await PostgresHelper.query(updateQuery, updateValues);
    return updateUserQuery[0];
  
  }
}