import { User } from '../models/user.model'; // Adjust path if necessary

declare global {
  namespace Express {
    interface Request {
      user?: User; // Add 'user' property to the Request interface
    }
  }
}