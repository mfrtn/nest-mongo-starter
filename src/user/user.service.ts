import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { RegisterDto } from 'src/auth/dtos/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async checkUserByMobile(mobile: string): Promise<{ _id: Types.ObjectId }> {
    return await this.userModel.exists({
      mobile,
    });
  }

  async findUserById(_id: ObjectId): Promise<UserDocument> {
    return await this.userModel.findById(_id);
  }

  async findUserByMobile(mobile: string): Promise<UserDocument> {
    return await this.userModel.findOne({
      mobile,
    });
  }

  async createNewUser(body: RegisterDto): Promise<UserDocument> {
    return await this.userModel.create(body);
  }
}
