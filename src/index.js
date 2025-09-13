import 'dotenv/config.js';
import express from 'express';
import { PostgresHelper } from './database/postgres/helper-postgres.js';


const app = express() 

app.get('/', async (req, res) => {
  const result = await PostgresHelper.query('SELECT * FROM users;')
  res.json(result)
})


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})