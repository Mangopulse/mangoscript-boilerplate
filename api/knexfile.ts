// Knex configuration for different environments
import { Knex } from "knex";
import dotenv from "dotenv";
import path from 'path';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "dev.sqlite3"),
    },
    useNullAsDefault: true,
  },
  test: {
    client: "sqlite3",
    connection: ":memory:",
    useNullAsDefault: true,
  },
};

export default config;
