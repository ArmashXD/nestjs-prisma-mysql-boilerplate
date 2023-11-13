import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/user/user.model';
import { generalResponse } from 'utils/helpers/response';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginDto: LoginDto): Promise<any | null> {
    try {
      const { email, password } = loginDto;
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const validatePassword = await bcrypt.compare(password, user.password);
      if (!validatePassword) {
        throw new NotFoundException(
          'There is something wrong with your credentials',
        );
      }
      return {
        user,
        token: this.jwtService.signAsync({ email }),
      };
    } catch (error) {
      throw new HttpException(
        { status: false, code: HttpStatus.BAD_REQUEST, message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async register(createDto: RegisterUserDto): Promise<{}> {
    try {
      const user = new User();
      user.name = createDto.name;
      user.email = createDto.email;
      user.address = createDto.address;
      user.first_name = createDto.first_name;
      user.last_name = createDto.last_name;
      user.password = await bcrypt.hash(createDto.password, 10);

      const newUser = await this.userService.createUser(user);

      return generalResponse(
        HttpStatus.CREATED,
        newUser,
        'Registration successful',
      );
    } catch (error) {
      throw new HttpException(
        { status: false, code: HttpStatus.BAD_REQUEST, message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
