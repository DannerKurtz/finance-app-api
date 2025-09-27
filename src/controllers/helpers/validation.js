import validator from 'validator';
import { badRequest } from './http.js';

export const checkIfUserIdIsValid = (userId) => validator.isUUID(userId);
export const invalidIdResponse = () => badRequest({message: 'The user id is invalid.'});

export const checkIfIsString = (value) => typeof value === 'string';

export const validateRequiredFids = (params, requiredFields) => {

  for (const field of requiredFields) {
    const fieldIsMissing = !params[field]
    const fieldIsEmpty = (checkIfIsString(params[field]) && 
          validator.isEmpty(params[field], {
          ignore_whitespace: true
        }));
        if (fieldIsMissing || fieldIsEmpty) {
          return {
            missingField: field,
            ok: false,
          }
        }
      }
      return {
        missingField: undefined,
        ok: true,
      }
    
}