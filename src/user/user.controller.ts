import { UserService } from './user.service';
import { Get, Param, Controller, Req, Res } from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  async getAllUsers(): Promise<{}> {
    const result = await this.service.getAllUsers();
    return result;
  }

  @Get(':id')
  async getUser(@Param('id') id: Number): Promise<{}> {
    const result = await this.service.getUser(id);
    return result;
  }
}
