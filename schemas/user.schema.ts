import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(3, 'username must be at least 3 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  photo: z.string().optional(),
  role: z.enum(['freelancer', 'client'], {
    required_error: 'Role is required',
    invalid_type_error: 'Role must be either freelancer or client',
  }),
});

export const loginUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
