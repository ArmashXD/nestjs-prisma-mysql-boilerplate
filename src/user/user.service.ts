import { PrismaService } from '../prisma.service';
import { Injectable, ConflictException } from '@nestjs/common';
import { User } from './user.model';
import { isEmpty } from 'utils/helpers/isEmpty';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUser(id: Number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (isEmpty(user)) {
      return null;
    }
    return user;
  }

  async createUser(data: User): Promise<User | null> {
    const existing = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existing) {
      throw new ConflictException('Email already exists !');
    }

    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(data: User, id: number): Promise<User | null> {
    if (id === null) {
      return null;
    }
    const user = await this.getUser(id);
    if (user && !('message' in user)) {
      return this.prisma.user.update({
        where: { id: Number(id) },
        data,
      });
    }

    return null;
  }

  async deleteUser(id: number): Promise<User | null> {
    const user = await this.getUser(id);
    if (user && !('message' in user)) {
      return this.prisma.user.delete({ where: { id: Number(id) } });
    }

    return null;
  }
}
