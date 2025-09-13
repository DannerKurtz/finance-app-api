import 'dotenv/config';
import pg from 'pg';


const {Pool} = pg;

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE
})


export const PostgresHelper = {
  query: async (query, params) => {
    const client = await pool.connect();
   const results = await client.query(query, params);
   client.release();
   return results.rows;
  
  }
}