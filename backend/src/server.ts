import express, { Request, Response, NextFunction, Router } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'; 

import connectDB from './config/config';
import userRoute from './routes/userRoute'; 
import authRoute from './routes/authRoute'; 

dotenv.config();

const corsOptions = {
  origin: ['http://localhost:5173', 'https://image-tamer-6jqy.vercel.app'], // Allow both local and production frontend
  credentials: true, 
};


// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from environment variables or fallback to 3000

app.use(cookieParser());
app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

app.use((err: any, _req: Request, res: Response, _next: NextFunction): void => {
  const statusCode = err.statusCode || 500; 
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    error: message,
    statusCode: statusCode,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
