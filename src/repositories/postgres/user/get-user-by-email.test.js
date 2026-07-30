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
});
