import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class SignupDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(25)
  name: string;
  @IsEmail()
  email: string;
  @IsStrongPassword()
  password: string;
  @IsStrongPassword()
  rePassword: string;
  @IsNumber()
  @Min(7)
  age: number;
}
export class SigninDTO {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}

export class UpdateDTO {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(25)
  name: string;
  @IsEmail()
  @IsOptional()
  email: string;
  @IsOptional()
  @IsNumber()
  @Min(7)
  @Max(99)
  age: number;
}
