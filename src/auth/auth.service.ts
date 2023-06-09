import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserDocument } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { RegisterDto, SignInDto } from './dtos/auth.dto';

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
      body.password = await bcrypt.hash(body.password, 12);
      return await this.userService.createNewUser(body);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async loginWithPassword(body: SignInDto): Promise<any> {
    const user = await this.userService.findUserByMobile(body.mobile);
    if (!user) {
      throw new ForbiddenException('Invalid Credentials');
    }
    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
      throw new ForbiddenException('Invalid Credentials');
    }
    return this.generateJwt(user._id.toString());
  }
}
