import { PostgresHelper } from '../../database/postgres/helper-postgres.js';

export class PostgresUpdateUserRepository {
  async execute(userId, updateUserParams) {
    const updateFields = [];
    const updateValues = [];

    Object.keys(updateUserParams).forEach((key, index) => {
      updateFields.push(`${key} = $${index + 1}`);
      updateValues.push(updateUserParams[key]);
    });
    updateValues.push(userId);
    
    const updateQuery = `
      UPDATE users
      SET ${updateFields.join(', ')}
      WHERE id = $${updateValues.length}
      RETURNING *
    `;

    const updateUserQuery = await PostgresHelper.query(updateQuery, updateValues);
    return updateUserQuery[0];
  
  }
}