import { faker } from '@faker-js/faker';
import request from 'supertest';
import { app } from '../app.js';
import { transaction, user } from './../tests/index.js';
describe('User Routes E2E Tests', () => {
  it('POST /users should return 201 when user is created', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        ...user,
        id: undefined,
      });

    expect(response.status).toBe(201);
  });

  it('GET /api/:userId should return 200 when user is found', async () => {
    const createdUser = await request(app)
      .post('/api/users')
      .send({
        ...user,
        id: undefined,
      });
    const response = await request(app).get(
      `/api/users/${createdUser.body.createdUser.id}`,
    );

    expect(response.status).toBe(200);
  });

  it('PATCH /api/:userId should return 200 when user updated', async () => {
    const { id, ...fakerUser } = user;
    const createdUser = await request(app)
      .post('/api/users')
      .send({
        ...fakerUser,
      });
    const response = await request(app)
      .patch(`/api/users/${createdUser.body.createdUser.id}`)
      .send({
        ...fakerUser,
        first_name: faker.person.firstName(),
        email: faker.internet.email(),
      });

    expect(response.status).toBe(200);
  });

  it('DELETE /api/:userId should return 200 when user deleted', async () => {
    const { id, ...fakerUser } = user;
    const createdUser = await request(app)
      .post('/api/users')
      .send({
        ...fakerUser,
      });
    const response = await request(app).delete(
      `/api/users/${createdUser.body.createdUser.id}`,
    );

    expect(response.status).toBe(200);
  });

  it('GET /api/:userId/balance should return 200 when return balance', async () => {
    const { id, ...fakerUser } = user;
    const createdUser = await request(app)
      .post('/api/users')
      .send({
        ...fakerUser,
      });

    const transactionC = await request(app)
      .post(`/api/transactions`)
      .send({
        ...transaction,
        amount: 1000,
        type: 'INVESTMENT',
        user_id: createdUser.body.createdUser.id,
      });

    console.log('Transaction created:', transactionC.body);
    const response = await request(app).get(
      `/api/users/${createdUser.body.createdUser.id}/balance`,
    );

    expect(response.status).toBe(200);
  });
});
