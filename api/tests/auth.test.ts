import request from 'supertest';
import app from '../src/app';

describe('Auth API', () => {
  it('should register a new user', async () => {
    const response = await request(app.callback())
      .post('/register')
      .send({ username: 'testuser', password: 'password' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User registered successfully');
  });
});
