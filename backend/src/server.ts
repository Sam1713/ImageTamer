import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import connectDB from './config/config';


connectDB();

const app = express();
const PORT = 3000;


app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});