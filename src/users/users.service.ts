import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { RegisterDto } from '../auth/dto/register.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}
  async checkEmail(email: string): Promise<boolean> {
    const userFound = await this.userModel.findOne({ email });
    return !!userFound;
  }

  async create(user: RegisterDto): Promise<IUser> {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async findOneById(id: string): Promise<IUser> {
    return this.userModel.findById(id).exec();
  }

  async findOneByEmail(email: string): Promise<IUser> {
    return this.userModel.findOne({ email }).exec();
  }

  async changePassword(
    user: IUser,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const { oldPassword, newPassword } = changePasswordDto;
    if (await user.compareEncryptedPassword(oldPassword)) {
      user.password = newPassword;
      await user.save();
    }
  }
}
