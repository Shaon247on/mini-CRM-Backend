import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connection } from './postgres/postgres';
import userRoutes from './routes/user.route';
import clientRoutes from './routes/client.route';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Allow only your frontend
    credentials: true                // Optional: allow cookies/headers if needed
  }));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/', clientRoutes);



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
})

connection();