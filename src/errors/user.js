export class EmailAlreadyExistsError extends Error {
  constructor(email) {
    super(`The provided email ${email} is already in use.`);
    this.name = 'EmailAlreadyExistsError';
  }
}