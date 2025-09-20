import validator from 'validator';
import { badRequest } from "./http.js";

export const invalidPasswordResponse = () => badRequest({message: 'The password must be at least 6 characters long.'});
export const emailAlreadyExistsResponse = () => badRequest({message: 'The email is already registered. Please use a different email.'});
export const invalidIdResponse = () => badRequest({message: 'The user id is invalid.'});
export const checkIfPasswordIsValid = (password) => password.length >= 6;
export const checkIfEmailIsValid = (email) => validator.isEmail(email);
export const checkIfUserIdIsValid = (userId) => validator.isUUID(userId)