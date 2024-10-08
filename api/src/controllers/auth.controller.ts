import { Context } from 'koa';
import AuthService from '../services/auth.service';

interface AuthRequestBody {
  username: string;
  password: string;
}

export default class AuthController {
  static async register(ctx: Context) {
    const { username, password } = ctx.request.body as AuthRequestBody; // Type assertion
    const result = await AuthService.register(username, password);
    ctx.body = result;
  }

  static async login(ctx: Context) {
    const { username, password } = ctx.request.body as AuthRequestBody; // Type assertion
    const result = await AuthService.login(username, password);
    ctx.body = result;
  }
}
