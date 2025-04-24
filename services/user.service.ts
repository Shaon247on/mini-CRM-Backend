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

export const registerUser = async (email: string, password: string, username: string) => {
  // Hash password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user in the database using Sequelize
  const newUser = await User.create({
    email,
    password: hashedPassword,
    username,
  });

  return newUser;
};
