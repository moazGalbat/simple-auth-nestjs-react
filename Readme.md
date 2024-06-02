# Project Overview
This is a full-stack application that performs simple authentication. The project has two main directories:
- `api`: Contains the backend code created with NestJS. [Here](https://github.com/moazGalbat/simple-auth-nestjs-react/blob/main/api/README.md)
- `client`: Contains the frontend code created with a React app. [Here](https://github.com/moazGalbat/simple-auth-nestjs-react/blob/main/client/README.md)

## Deployment
- `api`: [API](https://auth-api-nestjs-moazgalbat-moazs-projects-4af0a0b8.vercel.app)
- `client`: [Preview](https://funny-muffin-b66140.netlify.app/)
## Installation

Follow the steps below to set up the project:

### Step 1: Install Dependencies

Navigate to each directory and run the following command to install the necessary dependencies:

```bash
cd api
npm install

cd ../client
npm install
```
### Step 2: Add Environment Variables

Copy the .env.example file to create a .env file in each directory:
```bash
cp .env.example .env
```

### Step 3: Start the Development Servers
Navigate to the client directory and start the development server:
```bash
cd client
npm run dev
```
For the API
Navigate to the api directory and start the development server:
```bash
cd api
npm run start:dev
```



