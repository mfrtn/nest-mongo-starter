import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto, SignInDto } from './dtos/auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login/')
  async login(@Body() body: SignInDto): Promise<{ token: string }> {
    const token = await this.authService.loginWithPassword(body);
    return {
      token,
    };
  }

  @Post('/register/')
  async register(@Body() body: RegisterDto) {
    return await this.authService.createNewUser(body);
  }
}
