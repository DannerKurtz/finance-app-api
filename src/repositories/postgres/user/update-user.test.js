import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';
import { prisma } from '../../../../prisma/prisma';
import { user as fakerUser } from '../../../tests';
import { PostgresUpdateUserRepository } from './update-user';
describe('PostgresUpdateUserRepository', () => {
  const updateUserParams = {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  it('should update a user in the database', async () => {
    const user = await prisma.user.create({ data: fakerUser });

    const sut = new PostgresUpdateUserRepository();

    const result = await sut.execute(user.id, updateUserParams);

    expect(result).toMatchObject({
      id: user.id,
      ...updateUserParams,
    });
  });

  it('should prisma with correct parameters', async () => {
    const user = await prisma.user.create({ data: fakerUser });

    const sut = new PostgresUpdateUserRepository();

    const spy = jest.spyOn(prisma.user, 'update');

    await sut.execute(user.id, updateUserParams);

    expect(spy).toHaveBeenCalledWith({
      where: { id: user.id },
      data: updateUserParams,
    });
  });
  it('should throw if Prisma throws', async () => {
    const sut = new PostgresUpdateUserRepository();
    jest.spyOn(prisma.user, 'update').mockRejectedValueOnce(new Error());

    const promise = sut.execute(fakerUser.id, updateUserParams);

    await expect(promise).rejects.toThrow();
  });
});
