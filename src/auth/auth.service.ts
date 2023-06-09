import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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
    const user = await this.userService.checkUserByMobile(body.mobile);

    if (user) {
      throw new ConflictException('This mobile is already registered');
    }
    try {
      return await this.userService.createNewUser(body);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
