import { faker } from '@faker-js/faker';
import request from 'supertest';
import { app } from '../app.js';
import { user } from './../tests/index.js';
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
});
