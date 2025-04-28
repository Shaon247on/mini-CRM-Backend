import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Middleware to authenticate the user by verifying the JWT token
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  // If no token is provided, respond with a 401 Unauthorized error
  if (!token) {
    const authError = { message: "Unauthorized" };
    return next(authError);  // Pass the error to the error-handling middleware
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Attach the decoded user information to the request object
    (req as any).user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    const authError = { message: "Invalid or expired token" };
    return next(authError);  // Pass the error to the error-handling middleware
  }
};
