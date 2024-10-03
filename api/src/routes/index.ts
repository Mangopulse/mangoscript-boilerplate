import Router from 'koa-router';
import AuthController from '../controllers/auth.controller';
import UserController from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = new Router();

// Root route that responds with a welcome message
router.get('/', async (ctx) => {
    ctx.body = { message: 'Welcome to the API!' };
  });

router.post('/login', AuthController.login);


// Protected routes
router.post('/register',authMiddleware, AuthController.register);
router.get('/users', authMiddleware, UserController.getAllUsers);  // Get all users (requires authentication)
router.get('/me', authMiddleware, UserController.getCurrentUser);  // Get the current logged-in user



export default router;
