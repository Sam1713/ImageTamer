import express, { Request, Response, NextFunction,Router} from 'express';
import connectDB from './config/config';
import userRoute from './routes/userRoute'; // Adjust path if necessary
import authRoute from './routes/authRoute'; // Adjust path if necessary

// Connect to the database
connectDB();

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

// Error-handling middleware
app.use(( err:any,_req: Request, res: Response,_next: NextFunction):void => {
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
