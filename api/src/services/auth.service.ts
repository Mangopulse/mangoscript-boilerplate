import bcrypt from 'bcrypt';
import AuthRepository from '../repositories/auth.repository';

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
    return { message: 'Login successful' };
  }
}
