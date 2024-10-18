import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
dotenv.config();
mongoose.connect(process.env.MONGOURL as string)
.then(()=>{
  console.log("Connected to MongoDb");
})
.catch((error)=>{
  console.log(error);
  
})
const app = express();
const PORT = 3000;


app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});