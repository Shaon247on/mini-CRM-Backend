import express from 'express';
import dotenv from 'dotenv';
import { connection } from './postgres/postgres';
import userRoutes from './routes/user.route';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
})

connection();