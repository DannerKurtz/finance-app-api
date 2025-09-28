import { PostgresHelper } from "../../../database/postgres/helper-postgres.js";


export class PostgresUpdateTransactionRepository{
   async execute(transactionId, updateTransactionParams) {
    const updateFields = [];
    const updateValues = [];

    Object.keys(updateTransactionParams).forEach((key, index) => {
      updateFields.push(`${key} = $${index + 1}`);
      updateValues.push(updateTransactionParams[key]);
    });
    updateValues.push(transactionId);
    
    const updateQuery = `
      UPDATE users
      SET ${updateFields.join(', ')}
      WHERE id = $${updateValues.length}
      RETURNING *
    `;

    const updateTransactionQuery = await PostgresHelper.query(updateQuery, updateValues);
    return updateTransactionQuery[0];
  
  }
}