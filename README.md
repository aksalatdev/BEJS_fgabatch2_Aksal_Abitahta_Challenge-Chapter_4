
# Simple Bank System

This is a RESTful API built with Node.js, Express, and Prisma for managing users, bank accounts, and transactions.




## Run Locally

Clone the project

```bash
  git clone https://github.com/aksalatdev/BEJS_fgabatch2_Aksal_Abitahta_Challenge-Chapter_4.git
```

Go to the project directory

```bash
  BEJS_fgabatch2_Aksal_Abitahta_Challenge-Chapter_4
```

Install dependencies

```bash
  npm install
```

### Set up environment variables:
Create a .env file in the root directory and add the following:
```
DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase"
PORT=3000
```
### Set up the database:

Initialize Prisma and apply the migrations:
```
npx prisma migrate dev --name init
npx prisma generate
```

### Start the server

```bash
  npm run start
```


## Testing for API

## Users
Create User

Endpoint: POST /api/v1/users

Body : 
```
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "identity_type": "ID Card",
  "identity_number": "123456789",
  "address": "123 Main St"
}

```
