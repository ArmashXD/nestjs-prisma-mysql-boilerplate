import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const result = await this.authService.login(loginDto);
    return result;
  }

  @Post('register')
  async register(@Body() registerDto: RegisterUserDto): Promise<any> {
    const result = await this.authService.register(registerDto);
    return result;
  }
}
