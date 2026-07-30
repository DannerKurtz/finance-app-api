import { jest } from '@jest/globals';
import { prisma } from '../../../../prisma/prisma';
import { user } from '../../../tests';
import { PostgresCreateUserRepository } from './create-user';

describe('CreateUserRepository', () => {
  it('should create a user on db', async () => {
    const sut = new PostgresCreateUserRepository();

    const result = await sut.execute(user);

    expect(result.id).toBe(user.id);
    expect(result.first_name).toBe(user.first_name);
    expect(result.last_name).toBe(user.last_name);
    expect(result.password).toBe(user.password);
    expect(result.email).toBe(user.email);

    expect(result).toBeTruthy();
  });

  it('should call Prisma with correct values', async () => {
    const sut = new PostgresCreateUserRepository();

    const createSpy = jest.spyOn(prisma.user, 'create');

    await sut.execute(user);

    expect(createSpy).toHaveBeenCalledWith({
      data: user,
    });
  });

  it('should throw if Prisma throws', async () => {
    const sut = new PostgresCreateUserRepository();
    jest.spyOn(prisma.user, 'create').mockRejectedValueOnce(new Error());

    const promise = sut.execute(user);

    await expect(promise).rejects.toThrow();
  });
});
