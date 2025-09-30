
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../helper-postgres.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execMigrations = async () => {
  try {
    const client = await pool.connect();
    const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.sql'));

    for (const file of files) {
      const filePath = path.join(__dirname, file);
      const script = fs.readFileSync(filePath, 'utf-8');

      await client.query(script);
      console.log(`Migration ${file} executed successfully.`)
    }

  client.release();

  console.log('all migration executed successfully.');
  } catch (error) {
    console.log('Error executing migration:', error);
  }
}

execMigrations();