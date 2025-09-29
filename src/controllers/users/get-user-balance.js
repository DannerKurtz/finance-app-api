import { UserNotFoundError } from '../../errors/user.js';
import { badRequest, checkIfIdIsValid, internalServer, ok } from '../helpers/index.js';

export class GetUserBalanceController{
  constructor(getUserBalanceUseCase){
    this.getUserBalanceUseCase = getUserBalanceUseCase;
  }
  async execute(httpRequest){
    try {
      const userId = httpRequest.params.userId;

      const verifyUserId = checkIfIdIsValid(userId);

      if(!verifyUserId){
        return badRequest({message: 'Invalid user id.'});
      }

      const balance = await this.getUserBalanceUseCase.execute({userId});

      return ok({balance});

    } catch (error) {
      if(error instanceof UserNotFoundError){
        return badRequest({message: error.message});
      }
      console.error(error);
      return internalServer()
    }
  }
}