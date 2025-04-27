import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connection } from './postgres/postgres';
import userRoutes from './routes/user.route';
import clientRoutes from './routes/client.route';

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://mini-crm-backend-production.up.railway.app/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/', clientRoutes);



const PORT = process.env.PGPORT || 8000;
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
})

connection();