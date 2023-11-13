import { Book } from './book.model';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { isEmpty } from 'utils/helpers/isEmpty';
import { GeneralResponse, generalResponse } from 'utils/helpers/response';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async getAllBook(): Promise<Book[]> {
    const result = await this.prisma.book.findMany();
    return result;
  }

  async getBook(id: Number): Promise<Book | string | GeneralResponse> {
    const book = await this.prisma.book.findUnique({
      where: { id: Number(id) },
    });
    if (isEmpty(book)) {
      return generalResponse(404, null, 'Book not found');
    }
    return generalResponse(200, book, 'Retreived book');
  }

  async createBook(data: Book): Promise<Book> {
    return this.prisma.book.create({
      data,
    });
  }

  async updateBook(data: Book, id: number): Promise<Book | GeneralResponse> {
    if (id === null) {
      return generalResponse(404, null, 'Book not found');
    }

    const existingBook = await this.getBook(id);
    if (existingBook) {
      return this.prisma.book.update({
        where: { id: Number(id) },
        data: { title: data?.title, description: data?.description },
      });
    }

    return generalResponse(200, existingBook, 'Book updated');
  }

  async deleteBook(id: number): Promise<Book | GeneralResponse> {
    const existingBook = await this.getBook(id);
    if (existingBook) {
      return this.prisma.book.delete({ where: { id: Number(id) } });
    }

    return generalResponse(200, existingBook, 'Book deleted');
  }
}
