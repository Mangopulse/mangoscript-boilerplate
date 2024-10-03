import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import dotenv from 'dotenv';
import router from './routes';  // Import your routes

// Load environment variables from .env file
dotenv.config();

// Create the Koa app instance
const app = new Koa();

// Middleware to log each request method and URL for debugging purposes
app.use(async (ctx, next) => {
  console.log(`${ctx.method} ${ctx.url}`);
  await next();
});

// Middleware to handle errors globally
app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      const error = err as Error; // Explicit type assertion to Error
      console.error('Unhandled Error:', error.message); // Log the error message
      ctx.status = (error as any).status || 500; // If there's a custom status, use it, otherwise default to 500
      ctx.body = { error: error.message || 'Internal Server Error' }; // Return the error message in the response
    }
  });
  

// Parse request bodies
app.use(bodyParser());

// Use the routes defined in the `routes` folder
app.use(router.routes());
app.use(router.allowedMethods());

// Define the port from the environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Start the Koa server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
