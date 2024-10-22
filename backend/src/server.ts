import express, { Request, Response, NextFunction, Router } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // Import cookie-parser
import dotenv from 'dotenv'; // Import dotenv

import connectDB from './config/config';
import userRoute from './routes/userRoute'; // Adjust path if necessary
import authRoute from './routes/authRoute'; // Adjust path if necessary

// Load environment variables from .env file
dotenv.config();

const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies, tokens, etc.)
};

// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from environment variables or fallback to 3000

app.use(cookieParser());
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

// Error-handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction): void => {
  const statusCode = err.statusCode || 500; // Accessing statusCode on any error
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
