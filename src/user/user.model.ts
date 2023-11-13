import { Prisma } from '@prisma/client';

export class User implements Prisma.UserCreateInput {
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  password: string;
  phone_number?: string;
  address?: string;
}
