
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../helper-postgres.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execMigrations = async () => {
  try {
    const filePath = path.join(__dirname, 'migration-01-init.sql');
  const script = fs.readFileSync(filePath, 'utf-8');

  const client = await pool.connect();
  await client.query(script);

  client.release();

  console.log('Migration executed successfully.');
  } catch (error) {
    console.log('Error executing migration:', error);
  }

}

execMigrations();