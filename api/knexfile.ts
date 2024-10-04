// Knex configuration for different environments
import { Knex } from "knex";
import dotenv from "dotenv";
import path from 'path';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "tmp/dev.sqlite3"),
    },
    useNullAsDefault: true,
  },
  test: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "tmp/test.sqlite3"),
    },
    useNullAsDefault: true,
  },
  testdev: {
    client: "sqlite3",
    connection: ":memory:",
    useNullAsDefault: true,
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.resolve(__dirname, './migrations')
    }
  }
};

export default config;
