import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

/**
 * The function `exceptionFactory` takes an array of errors and transforms them into a formatted object
 * to be used in a BadRequestException.
 * @param errors - An array of objects representing the errors that occurred. Each object should have
 * the following properties:
 * @returns a new instance of the `BadRequestException` class.
 */
const exceptionFactory = (errors) => {
  const result: Record<string, string[]> = {};
  errors.forEach((error, index) => {
    const key = error.property;
    if (!result[key]) {
      result[key] = [];
    }
    const constraints = error.constraints;
    const constraintKeys = Object.keys(constraints);
    const errorMessage = constraints[constraintKeys[0]];
    result[key].push(errorMessage);
  });
  return new BadRequestException({
    status: false,
    errors: result,
    message: 'Some error occured',
  });
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1/');
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => exceptionFactory(errors),
      stopAtFirstError: true,
    }),
  );
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  });
  app.enableShutdownHooks();
  await app.listen(process.env.PORT || 8000);
}

bootstrap();
