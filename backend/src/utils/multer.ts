import multer from 'multer';
import path from 'path';
import { Request } from 'express';

// Define storage options
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, '/uploads/images'); // Specify the directory for uploads
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Generate a unique filename
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`); // Append the file extension
  },
});

// Initialize Multer with storage options
const upload = multer({ storage });

export default upload;
