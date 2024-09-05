import { Transform } from "class-transformer";
import {
  IsString,
  MinLength,
  IsEmail,
  minLength,
  IsOptional,
} from "class-validator";

export class RegisterUserDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim()) //Quita todos los espacios
  @IsString()
  @MinLength(8)
  password: string;
}
