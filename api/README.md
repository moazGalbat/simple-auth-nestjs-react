# NestJS Authentication Application

## Overview

This project is a NestJS application designed to provide user authentication functionalities. The application has three main endpoints and utilizes JWT for secure authentication.

## Endpoints

1. **POST /auth/login**
   - Authenticates a user and returns a JWT token.
   - **Request Body:**
     ```json
     {
       "email": "user@example.com",
       "password": "P@ssw0rd"
     }
     ```

2. **POST /auth/register**
   - Registers a new user.
   - **Request Body:**
     ```json
     {
       "name": "John Doe",
       "email": "john.doe@example.com",
       "password": "P@ssw0rd"
     }
     ```

3. **GET /users/me**
   - Returns the authenticated user's information.
   - **Headers:**
     ```json
     {
       "Authorization": "Bearer <JWT_TOKEN>"
     }
     ```

## User Model

The user model consists of the following properties:

- **name:** String
- **email:** String
- **password:** String

## Technology Stack

- **NestJS:** A progressive Node.js framework for building efficient and scalable server-side applications.
- **MongoDB + Mongoose:** MongoDB as the database and Mongoose as the ODM (Object Data Modeling) library for MongoDB.
- **Passport:** Used for handling authentication strategies, specifically JWT (JSON Web Token).

## Installation and Setup

1. **install dependencies**
```bash
npm install
```
2. **Write `.env` file as `.env.example`**
3. **run the app**
```bash
npm run start:dev
```

## Usage
1. To register a new user, send a POST request to /auth/register with the user's name, email, and password.
2. To login, send a POST request to /auth/login with the user's email and password. The response will include a JWT token.
3. To access the protected route /users/me, include the JWT token in the Authorization header as a Bearer token.
