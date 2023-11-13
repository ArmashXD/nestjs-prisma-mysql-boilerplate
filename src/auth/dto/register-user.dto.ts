import { IsString, Length, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;
  @IsString()
  @IsNotEmpty()
  last_name: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @Length(6, 12)
  @IsNotEmpty()
  password: string;
  @IsString()
  phone_number?: string;
  @IsString()
  address?: string;
}
