import validator from 'validator';
import z from "zod";

export const createTransactionSchema = z.object({
  userId: z.string({
    required_error: 'User ID is required.'
  }).trim().uuid(),
  name: z.string({
    required_error: 'Name is required.'
  }).trim().min(3, {
    message: 'Name must have at least 3 characters.'
  }),
  amount: z.number({
    required_error: 'Amount is required.'
  }).min(3).refine((value) => validator.isCurrency(value.toFixed(2),{
    digits_after_decimal: [2],
    allow_decimal: true,
    decimal_separator: '.',
    allow_negatives: false
  })),
  type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT'], {
    required_error: 'Type is required.'
  }),
  date: z.string({
    required_error: 'Date is required.'
  }).datetime({
      message: 'Invalid date format.',
    })

})