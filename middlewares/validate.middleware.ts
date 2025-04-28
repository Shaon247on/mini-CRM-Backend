import { VercelRequest, VercelResponse } from '@vercel/node';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (req: VercelRequest, res: VercelResponse): VercelResponse | void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors });
    }
  };
};