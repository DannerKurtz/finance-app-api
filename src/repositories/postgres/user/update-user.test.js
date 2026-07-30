import { faker } from '@faker-js/faker';
import { prisma } from '../../../../prisma/prisma';
import { user as fakerUser } from '../../../tests';
import { PostgresUpdateUserRepository } from './update-user';
describe('PostgresUpdateUserRepository', () => {
  it('should update a user in the database', async () => {
    const user = await prisma.user.create({ data: fakerUser });

    const sut = new PostgresUpdateUserRepository();

    const updateUserParams = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const result = await sut.execute(user.id, updateUserParams);

    expect(result).toMatchObject({
      id: user.id,
      ...updateUserParams,
    });
  });
});
