import { Document } from 'mongoose';
export interface IUser extends Document {
  pseudo: string;
  email: string;
  password: string;
  compareEncryptedPassword: (password: string) => Promise<boolean>;
  getEncryptedPassword: (password: string) => Promise<string>;
}
