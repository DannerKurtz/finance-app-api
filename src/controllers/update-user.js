import validator from 'validator';
import { EmailAlreadyExistsError } from '../errors/user.js';
import { UpdateUserUseCase } from '../use-cases/update-user.js';
import { badRequest, internalServer, ok } from "./helpers.js";

export class UpdateUserController{
  async execute(httpRequest){
    try {
    const updateUserParams = httpRequest.body;
    const userId = httpRequest.params.userId;

    if(!validator.isUUID(userId)){
      return badRequest({message: 'The user id is required.'});
    }

    const allowedFields = ['first_name', 'last_name', 'email', 'password'];

    const someFieldIsNotAllowed = Object.keys(updateUserParams).some(field => !allowedFields.includes(field));

    if(someFieldIsNotAllowed){
      return badRequest({message: 'Some field is not allowed.'});
    }

    if(updateUserParams.password){
      const passwordIsValid = updateUserParams.password.length < 6
      if(passwordIsValid){
          return badRequest({message: 'Password must be at least 6 characters long.'});
      }
    }

    if (updateUserParams.email) {
      const emailIsValid = validator.isEmail(updateUserParams.email);
      if (!emailIsValid) {
        return badRequest({ message: 'E-mail is invalid. Add a valid e-mail.' });
      }
    }

    const updateUserUseCase = new UpdateUserUseCase();
    const updatedUser = await updateUserUseCase.execute(userId, updateUserParams);

    return ok({updatedUser});
    } catch (error) {
      if(error instanceof EmailAlreadyExistsError){
        return badRequest({message: error.message});
      }
      console.error(error);
      return internalServer();
    }
  }
}
