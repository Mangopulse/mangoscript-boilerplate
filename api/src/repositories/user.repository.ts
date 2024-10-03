import knex from '../config/db';

export default class UserRepository {
  static async getAllUsers() {
    return knex('users').select('id', 'username');
  }
}
