import validator from 'validator';

export const checkIfAmountIsValid = (amount) =>(
  validator.isCurrency(amount.toString(), { 
    digits_after_decimal: [2],
    allow_decimal: true,
    decimal_separator: '.',
}));

export const checkIfTypeIsValid = (type) => (['EARNING', 'EXPENSE', 'INVESTMENT'].includes(type))