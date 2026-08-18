import express from 'express';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { transactionRouter } from './routes/transactions.js';
import { usersRouter } from './routes/users.js';
export const app = express();

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/transactions', transactionRouter);

const swaggerDocument = JSON.parse(
  fs.readFileSync(
    path.join(import.meta.dirname, '../docs/swagger.json'),
    'utf8',
  ),
);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
