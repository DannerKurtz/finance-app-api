import { jest } from '@jest/globals';
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

  it('should call Prisma with correct values', async () => {
    const sut = new PostgresDeleteUserRepository();

    jest.spyOn(prisma.user, 'delete').mockResolvedValue(user.id);
    const deleteSpy = jest.spyOn(prisma.user, 'delete');

    await sut.execute(user.id);

    expect(deleteSpy).toHaveBeenCalledWith({
      where: { id: user.id },
    });
  });
});
