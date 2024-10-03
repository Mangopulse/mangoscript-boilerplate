import { Context } from 'koa';
import UserRepository from '../repositories/user.repository';

export default class UserController {
  static async getAllUsers(ctx: Context) {
    const users = await UserRepository.getAllUsers();
    ctx.body = users;
  }

  static async getCurrentUser(ctx: Context) {
    const user = ctx.state.user; // The authenticated user attached in authMiddleware
    ctx.body = user;
  }
}
