import { IUser } from '../users/interfaces/user.interface';

export interface IAuthorizedRequest extends Request {
  user?: IUser;
}
