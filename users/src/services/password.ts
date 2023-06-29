import { hash, compare } from 'bcryptjs';

export class Password {
  static async hashPassword(password: string) {
    return await hash(password, 12);
  }

  static async verifyPassword(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword);
  }
}
