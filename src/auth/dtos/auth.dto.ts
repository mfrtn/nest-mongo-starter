import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Matches,
  IsStrongPassword,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';

import { IsMatch } from 'src/decorators/isMatch.decorator';
import { Role } from 'src/user/schemas/user.schema';

export class RegisterDto {
  // Exclude when user.role === Role.CUSTOMER
  // Required when user.role  !== Role.CUSTOMER
  // Lowercase
  @IsOptional()
  @IsString()
  @MinLength(3)
  @Matches(/^[a-zA-Z][a-zA-Z0-9]*(?:[._-][a-zA-Z0-9]+)*$/, {
    message: 'Username is not valid',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  username?: string;

  // Exclude when user.role !== Role.CUSTOMER
  // Required when user.role  === Role.CUSTOMER
  @IsOptional()
  @IsString()
  @Matches(/^09[0-9]{9}$/, {
    message: 'Mobile phone number is not valid',
  })
  mobile?: string;

  @IsEnum(Role)
  role: Role;

  @IsStrongPassword()
  password: string;

  // Remove property after class validation
  @IsNotEmpty()
  @IsMatch('password', {
    message: 'Password confirmation does not match',
  })
  confirmPassword: string;
}

export class SignInWithUsernameDto {
  @IsString()
  @MinLength(3)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  username: string;

  @IsNotEmpty()
  password: string;
}

export class SignInWithMobileDto {
  @Matches(/^09[0-9]{9}$/, {
    message: 'Phone must be a valid phone number',
  })
  mobile: string;

  @IsNotEmpty()
  password: string;
}
