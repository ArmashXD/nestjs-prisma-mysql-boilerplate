import {
  Get,
  Post,
  Put,
  Delete,
  Param,
  Controller,
  Body,
  UseGuards,
} from '@nestjs/common';
import { Book } from './book.model';
import { BookService } from './book.service';
import { GeneralResponse } from 'utils/helpers/response';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getAllBook(): Promise<{} | GeneralResponse> {
    const result = await this.bookService.getAllBook();
    return result;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getBook(@Param('id') id: Number): Promise<{} | GeneralResponse> {
    const result = await this.bookService.getBook(id);
    return result;
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createBook(@Body() data: Book): Promise<Book> {
    return this.bookService.createBook(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateBook(
    @Body() data: Book,
    @Param('id') id: number,
  ): Promise<Book | GeneralResponse> {
    return this.bookService.updateBook(data, id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteBook(@Param('id') id: number): Promise<Book | GeneralResponse> {
    return this.bookService.deleteBook(id);
  }
}
