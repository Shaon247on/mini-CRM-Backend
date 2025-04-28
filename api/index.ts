import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import userRoutes from '../routes/user.route';
import clientRoutes from '../routes/client.route';

// Initialize the Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('🚀 CRM Mini Server is running successfully!');
});

// Export the Express app wrapped in a Vercel handler
export default (req: VercelRequest, res: VercelResponse) => {
  app(req, res); // Express-style handler to work with Vercel
};
