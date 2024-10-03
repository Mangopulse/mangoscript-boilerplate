# Mangoscript Boilerplate
Typescript,Nodejs,React



# API

## Step 1: Initialize the Project

### Initialize Node.js project

```bash
npm init -y
```

## Install required dependencies

### Core Dependencies:

```bash
npm install koa koa-router koa-bodyparser knex sqlite3 dotenv
```

- ``koa``: Web framework.
- ``koa-router``: Routing for Koa.
- ``koa-bodyparser``: For parsing request bodies.
- ``knex``: SQL query builder.
- ``sqlite3``: Database engine.
- ``dotenv``: Environment variables.



### Dev Dependencies:

```bash
npm install --save-dev typescript ts-node jest ts-jest eslint prettier supertest @types/jest @types/koa @types/koa-router @types/supertest
```

- ``typescript``: TypeScript support.
- ``ts-node``: Run TypeScript directly.
- ``jest``: Testing framework.
- ``ts-jest``: Jest with TypeScript.
- ``eslint``: Linting to enforce best practices.
- ``prettier``: Code formatter.
- ``supertest``: HTTP assertions for testing.




## Initialize TypeScript configuration:

```bash
npx tsc --init
```


# Step 2: Setup Folder Structure for API

api/
│
├── src/
│   ├── controllers/        # Controllers handling requests
│   ├── services/           # Business logic services
│   ├── repositories/       # Database operations
│   ├── routes/             # Route definitions
│   ├── models/             # Database models using Knex.js
│   ├── middlewares/        # Custom middleware (e.g., authentication)
│   ├── config/             # Application configuration
│   └── app.ts              # Main Koa setup
│
├── tests/                  # Unit and integration tests
│
├── migrations/             # Database migrations
│
├── .env                    # Environment variables (e.g., DATABASE
