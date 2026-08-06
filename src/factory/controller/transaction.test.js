import {
  CreateTransactionController,
  UpdateTransactionController,
} from '../../controllers';
import {
  makeCreateTransactionController,
  makeUpdateTransactionController,
} from './transaction';

describe('Transaction Controller Factory', () => {
  it('should return a valid CreateTransactionController instance', () => {
    expect(makeCreateTransactionController()).toBeInstanceOf(
      CreateTransactionController,
    );
  });

  it('should return a valid UpdateTransactionController instance', () => {
    expect(makeUpdateTransactionController()).toBeInstanceOf(
      UpdateTransactionController,
    );
  });
});
