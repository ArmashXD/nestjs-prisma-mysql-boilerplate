## Description

This is a boilerplate project built with NestJS, Prisma, TypeScript, and MySQL. It includes JWT-Passport authentication and Prisma migrations to help you kickstart your NestJS projects.

## Features

- **NestJS:** A powerful Node.js framework for building scalable and maintainable server-side applications.
- **Prisma:** Modern database access toolkit that supports TypeScript and is designed to work well with databases like MySQL.
- **TypeScript:** A strongly-typed superset of JavaScript that adds static typing to the language.
- **MySQL:** A popular open-source relational database management system.
- **JWT-Passport Authentication:** JSON Web Token (JWT) authentication using Passport for secure user authentication.

## Installation

```bash
Clone the repository:
$ git clone https://github.com/your-username/your-boilerplate.git

Navigate to the project folder:
$ cd nest-js-prisma-mysql-boilerplate

Install dependencies
$ npm install

```

## Running the app

```bash
Set up your Prisma project by creating your Prisma schema file with the following command
$ npx prisma init

Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)
$ npx prisma migrate dev

Pull the schema from an existing database, updating the Prisma schema
$ prisma db pull

Push the Prisma schema state to the database
$ prisma db push

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Support

If you encounter any issues or have questions, feel free to open an issue. I will be updating this repo with more features.

## Stay in touch

- Author - [Syed Armash Hussain](https://syed-armash-hussain.vercel.app/)
- LinkedIn - [@syedArmash](https://www.linkedin.com/in/syed-armash/)
