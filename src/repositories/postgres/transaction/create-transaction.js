import { PostgresHelper } from "../../../database/postgres/helper-postgres.js";

export class PostgresCreateTransactionRepository {
  async execute(createTransactionParams){
    await PostgresHelper.query(`
      INSERT INTO transactions (id, user_id, amount, name, date, type) 
      VALUES ($1, $2, $3, $4, $5, $6)`, 
      [
        createTransactionParams.id,
        createTransactionParams.userId,
        createTransactionParams.amount,
        createTransactionParams.name,
        createTransactionParams.date,
        createTransactionParams.type
      ])

       const transactionCreated = await PostgresHelper.query(
      `SELECT * FROM transactions WHERE id = $1`,
      [createTransactionParams.id]
    )
    
    return transactionCreated[0];
  }
}