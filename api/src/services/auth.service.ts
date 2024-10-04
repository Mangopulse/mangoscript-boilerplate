import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AuthRepository from '../repositories/auth.repository';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'; // Ensure you have this in your .env

export default class AuthService {
  static async register(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return AuthRepository.createUser(username, hashedPassword);
  }

  static async login(username: string, password: string) {
    const user = await AuthRepository.findUserByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: '1h', // Token valid for 1 hour
    });

    return { message: 'Login successful', token };
  }

  static async verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.log(error)
      throw new Error('Invalid or expired token');
    }
  }
}
