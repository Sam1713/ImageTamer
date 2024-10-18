import express from 'express';

import connectDB from './config/config';
import userRoute from "../src/routes/userRoute"
import authRoute from "../src/routes/authRoute"
connectDB();

const app = express();
const PORT = 3000;

app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});