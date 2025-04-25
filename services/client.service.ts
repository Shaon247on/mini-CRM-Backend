import { User, UserAttributes } from '../models/user.model';
import bcrypt from 'bcrypt';

export const createUserService = async (userData: UserAttributes) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = await User.create({ ...userData, password: hashedPassword });
  return newUser;
};

export const loginUserService = async (email: string, password: string) => {
  // Find user by email
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  return user;
};
