import knex from "../config/db";

export default class AuthRepository {
  static async createUser(username: string, password: string) {
    await knex("users").insert({
      username,
      password,
      role: "user",
      created_at: new Date(),
      updated_at: new Date(),
    });
    return { message: "User registered successfully" };
  }

  static async findUserByUsername(username: string) {
    return knex("users").where({ username }).first();
  }
}
