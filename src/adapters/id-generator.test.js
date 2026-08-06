import { IdGeneratorAdapter } from './id-generator';

describe('IdGeneratorAdapter', () => {
  it('should return a random id', () => {
    const sut = new IdGeneratorAdapter();
    const id = sut.execute();
    expect(id).toBeDefined();
  });
});
