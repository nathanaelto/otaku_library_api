import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IUser } from '../interfaces/user.interface';

const SALT_ROUNDS = 10;

function removePassword(doc, ret: { [key: string]: any }) {
  delete ret.password;
}
export const UserSchema = new mongoose.Schema<IUser>(
  {
    pseudo: {
      type: String,
      required: [true, 'Pseudo can not be empty'],
    },
    email: {
      type: String,
      required: [true, 'Email can not be empty'],
    },
    password: {
      type: String,
      required: [true, 'Password can not be empty'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    _id: true,
    toObject: {
      transform: removePassword,
      virtuals: true,
      versionKey: false,
    },
    toJSON: {
      transform: removePassword,
      virtuals: true,
      versionKey: false,
    },
  },
);

UserSchema.methods.getEncryptedPassword = (
  password: string,
): Promise<string> => {
  return bcrypt.hash(String(password), SALT_ROUNDS);
};

UserSchema.methods.compareEncryptedPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await this.getEncryptedPassword(this.password);
  next();
});
