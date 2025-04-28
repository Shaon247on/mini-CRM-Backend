import { VercelRequest, VercelResponse } from '@vercel/node';
import { createUser, loginUser } from '../controllers/user.controller';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema';
import { validate } from '../middlewares/validate.middleware';

const handleRequest = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === 'POST' && req.url?.endsWith('/register')) {
    // Validate the request body using the Zod schema
    const validationResult = validate(createUserSchema, req, res);
    if (validationResult) return validationResult; // If validation fails, return immediately

    return createUser(req, res);
  } else if (req.method === 'POST' && req.url?.endsWith('/login')) {
    // Validate the request body using the Zod schema
    const validationResult = validate(loginUserSchema, req, res);
    if (validationResult) return validationResult; // If validation fails, return immediately

    return loginUser(req, res);
  }

  // If no matching route is found, return an error
  return res.status(404).json({ message: 'Route not found' });
};

// Export the Vercel serverless function
export default (req: VercelRequest, res: VercelResponse) => {
  handleRequest(req, res);
};
