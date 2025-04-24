// routes/user.route.ts
import express from 'express';
import { createUser, loginUser } from '../controllers/user.controller';
import { validate } from '../middlewares/validate.middleware';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema';

const router = express.Router();

// User registration route
router.post('/register', validate(createUserSchema), createUser);

// User login route
router.post('/login', validate(loginUserSchema), loginUser);

export default router;
