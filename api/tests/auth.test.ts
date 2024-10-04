import request from 'supertest';
import http from 'http'; // Import http to create a server
import app from '../src/app'; // Your Koa app
import knex from '../src/config/db'; // Your Knex configuration

let server: http.Server; // Declare an HTTP server
let adminToken: string;  // Variable to hold admin token

// Set up the test environment and ensure migrations and seeds are applied
beforeAll(async () => {
  //process.env.NODE_ENV = 'test';  // Ensure you're in the test environment

  // Initialize the HTTP server from the Koa app
  server = http.createServer(app.callback());

  await knex.migrate.rollback();  // Clean the DB
  await knex.migrate.latest();    // Apply migrations

  // Seed the DB with the admin user
  await knex.seed.run();

  // Log in as the admin user
  const response = await request(server) // Pass the server instance here
    .post('/login')
    .send({
      username: 'admin',
      password: 'adminpassword'
    });

  adminToken = response.body.token;  // Save the admin JWT token
});

// Clean up and rollback migrations after all tests
afterAll(async () => {
  await knex.migrate.rollback();  // Rollback the DB changes
  await knex.destroy();           // Close the DB connection
  server.close();                 // Close the HTTP server
});

describe('Auth API', () => {
  it('should register a new user successfully as admin', async () => {
    const response = await request(server)
      .post('/register')
      .set('Authorization', `Bearer ${adminToken}`)  // Pass the admin JWT token
      .send({
        username: 'testuser',
        password: 'password'
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User registered successfully');
  });

  it('should login successfully with valid credentials', async () => {
    const response = await request(server)
      .post('/login')
      .send({
        username: 'testuser',
        password: 'password'
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();  // Ensure token is returned
  });

  it('should not login with invalid credentials', async () => {
    const response = await request(server)
      .post('/login')
      .send({
        username: 'invaliduser',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(500);  // Assuming invalid credentials return 400
    expect(response.body.error).toBe('Invalid credentials');
  });
});
