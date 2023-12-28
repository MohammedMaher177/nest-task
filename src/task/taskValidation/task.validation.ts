/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(25)
  title: string;
  @MinLength(10)
  @MaxLength(300)
  @IsNotEmpty()
  @IsString()
  description: string;
}
export class UpdateTaskDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(25)
  @IsOptional()
  title: string;
  @MinLength(10)
  @MaxLength(300)
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  description: string;
}
