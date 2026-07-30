import { jest } from '@jest/globals';
import { prisma } from '../../../../prisma/prisma';
import { user as fakerUser } from '../../../tests/';
import { PostgresGetUserByEmailRepository } from './get-user-by-email';
describe('getUserByEmailRepository', () => {
  it('should return the user by email', async () => {
    const user = await prisma.user.create({ data: fakerUser });
    const sut = new PostgresGetUserByEmailRepository();

    const result = await sut.execute(user.email);

    expect(result).toEqual(user);
  });

  it('should call Prisma with correct params', async () => {
    const spy = jest.spyOn(prisma.user, 'findUnique');
    const sut = new PostgresGetUserByEmailRepository();
    const email = fakerUser.email;

    await sut.execute(email);

    expect(spy).toHaveBeenCalledWith({
      where: {
        email,
      },
    });
  });
});
