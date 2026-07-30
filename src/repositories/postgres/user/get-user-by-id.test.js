import { jest } from '@jest/globals';
import { prisma } from '../../../../prisma/prisma';
import { user as fakerUser } from '../../../tests/';
import { PostgresGetUserByIdRepository } from './get-user-by-id';
describe('getUserByIdRepository', () => {
  it('should return the user by id', async () => {
    const user = await prisma.user.create({ data: fakerUser });
    const sut = new PostgresGetUserByIdRepository();

    const result = await sut.execute(user.id);

    expect(result).toEqual(user);
  });
  it('should call Prisma with correct params', async () => {
    const spy = jest.spyOn(prisma.user, 'findUnique');
    const sut = new PostgresGetUserByIdRepository();

    await sut.execute(fakerUser.id);

    expect(spy).toHaveBeenCalledWith({
      where: {
        id: fakerUser.id,
      },
    });
  });
});
