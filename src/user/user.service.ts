import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { RegisterDto } from 'src/auth/dtos/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async checkUser(query: {
    mobile?: string;
    username?: string;
  }): Promise<{ _id: Types.ObjectId }> {
    return await this.userModel.exists(query);
  }

  async createNewUser(body: RegisterDto): Promise<UserDocument> {
    return await this.userModel.create(body);
  }
}
