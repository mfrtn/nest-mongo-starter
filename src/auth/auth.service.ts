import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

import { UserDocument } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  generateJwt(id: string): string {
    return this.jwtService.sign({ id });
  }

  async createNewUser(body: RegisterDto): Promise<UserDocument> {
    let user: { _id: Types.ObjectId };
    try {
      if (body.mobile) {
        user = await this.userService.checkUser({ mobile: body.mobile });
      } else if (body.username) {
        user = await this.userService.checkUser({ username: body.username });
      } else {
        throw new NotAcceptableException(
          'One of username or mobile is required',
        );
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    if (user) {
      throw new ConflictException(
        'This username or mobile is already registered',
      );
    }
    try {
      return await this.userService.createNewUser(body);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
