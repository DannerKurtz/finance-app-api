import { PasswordHasherAdapter } from './password-hasher';

describe('PasswordHasherAdapter', () => {
  it('should hash a password', async () => {
    const sut = new PasswordHasherAdapter();
    const password = 'myPassword123';
    const hashedPassword = await sut.execute(password);
    expect(hashedPassword).toBeDefined();
  });
});
