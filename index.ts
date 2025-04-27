import express, { Request, Response, NextFunction } from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import { connection } from './postgres/postgres';
// import userRoutes from './routes/user.route';
// import clientRoutes from './routes/client.route';
// dotenv.config();

const app = express();

// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://mini-crm-frontend-rho.vercel.app'
// ];

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));

app.use(express.json());

// app.get('/', (req: Request, res: Response) => {
//   res.send('🚀 CRM Mini Server is running successfully!');
// });

const PORT = 8000

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/about', (req, res) => {
  res.send('About route 🎉 ')
})

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
})

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api', clientRoutes);



// // Server Start
// const PORT = process.env.PGPORT || 50809;
// app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);
// });

// connection();

