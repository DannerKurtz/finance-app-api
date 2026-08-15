import request from 'supertest';
import { app } from '../app.js';
import { transaction, user } from '../tests/index.js';

describe('Transactions E2E Test', () => {
  it('POST /transactions should return 201 when transaction is created', async () => {
    const createUserResponse = await request(app)
      .post('/api/users')
      .send({
        ...user,
        id: undefined,
      });
    const response = await request(app)
      .post('/api/transactions')
      .send({
        ...transaction,
        id: undefined,
        user_id: createUserResponse.body.createdUser.id,
      });

    expect(response.status).toBe(201);
  });

  it('GET /transactions should return 201 when transaction is created', async () => {
    const createUserResponse = await request(app)
      .post('/api/users')
      .send({
        ...user,
        id: undefined,
      });
    await request(app)
      .post('/api/transactions')
      .send({
        ...transaction,
        id: undefined,
        user_id: createUserResponse.body.createdUser.id,
      });

    const response = await request(app).get(
      `/api/transactions?userId=${createUserResponse.body.createdUser.id}`,
    );

    expect(response.status).toBe(200);
  });

  it('DELETE /transactions should return 201 when transaction is created', async () => {
    const createUserResponse = await request(app)
      .post('/api/users')
      .send({
        ...user,
        id: undefined,
      });
    const createTransactionResponse = await request(app)
      .post('/api/transactions')
      .send({
        ...transaction,
        id: undefined,
        user_id: createUserResponse.body.createdUser.id,
      });

    const response = await request(app).delete(
      `/api/transactions/${createTransactionResponse.body.transaction.id}`,
    );

    expect(response.status).toBe(200);
  });
});
