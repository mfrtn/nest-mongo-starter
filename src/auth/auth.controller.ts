import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login/')
  async login(): Promise<any> {
    return this.authService.generateJwt('test');
  }

  @Post('/register/')
  async register(@Body() body: RegisterDto) {
    return await this.authService.createNewUser(body);
  }
}
