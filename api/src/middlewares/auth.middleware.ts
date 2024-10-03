import { Context, Next } from 'koa';
import AuthService from '../services/auth.service';

export const authMiddleware = async (ctx: Context, next: Next) => {
  const authHeader = ctx.headers.authorization;

  if (!authHeader) {
    ctx.status = 401;
    ctx.body = { error: 'Authentication token is required' };
    return;
  }

  const token = authHeader.split(' ')[1]; // Assuming "Bearer <token>"
  try {
    const decoded = await AuthService.verifyToken(token);
    ctx.state.user = decoded; // Attach the user info to the context
    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = { error: 'Invalid or expired token' };
  }
};
