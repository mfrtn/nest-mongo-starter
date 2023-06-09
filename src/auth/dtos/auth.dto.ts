import {
  IsNotEmpty,
  IsString,
  Matches,
  IsStrongPassword,
  IsEnum,
} from 'class-validator';

import { IsMatch } from 'src/decorators/isMatch.decorator';
import { Role } from 'src/user/schemas/user.schema';

export class RegisterDto {
  @IsString()
  @Matches(/^09[0-9]{9}$/, {
    message: 'Mobile phone number is not valid',
  })
  mobile: string;

  @IsEnum(Role)
  role: Role;

  @IsStrongPassword()
  password: string;

  // [Todo] Remove property after class validation
  @IsNotEmpty()
  @IsMatch('password', {
    message: 'Password confirmation does not match',
  })
  confirmPassword: string;
}

export class SignInDto {
  @Matches(/^09[0-9]{9}$/, {
    message: 'Phone must be a valid phone number',
  })
  mobile: string;

  @IsNotEmpty()
  password: string;
}
