import { Request, Response } from 'express';
import { createUserService, loginUserService } from '../services/user.service';
import { generateToken } from '../utils/jwt.util';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = await createUserService(req.body);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error: any) {
    res.status(500).json({ message: 'User creation failed', error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Verify user credentials
    const user = await loginUserService(email, password);

    // Generate JWT Token
    const token = generateToken(user.id, user.email);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        photo: user.photo,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};
