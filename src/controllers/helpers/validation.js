import validator from 'validator';
import { badRequest } from './http.js';

export const checkIfUserIdIsValid = (userId) => validator.isUUID(userId);
export const invalidIdResponse = () => badRequest({message: 'The user id is invalid.'});