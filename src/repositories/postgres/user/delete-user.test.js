import { prisma } from '../../../../prisma/prisma';
import { user } from '../../../tests';
import { PostgresDeleteUserRepository } from './delete-user';

describe('PostgresDeleteUserRepository', () => {
  it('should delete a user on db', async () => {
    const sut = new PostgresDeleteUserRepository();

    const createUser = await prisma.user.create({
      data: user,
    });

    const result = await sut.execute(createUser.id);

    expect(result.id).toBe(createUser.id);
    expect(result.first_name).toBe(createUser.first_name);
    expect(result.last_name).toBe(createUser.last_name);
    expect(result.password).toBe(createUser.password);
    expect(result.email).toBe(createUser.email);

    expect(result).toBeTruthy();
  });
});
