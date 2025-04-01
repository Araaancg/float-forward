import multer from 'multer';
import { Request } from 'express';
import { ApiError } from '../middlewares/error-handler';
import httpStatus  from 'http-status';

// Define file type for TypeScript
export interface MulterFile extends Express.Multer.File {}

// Configure storage
const storage = multer.memoryStorage();

// Create multer upload instance
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit (adjust as needed)
  },
  fileFilter: (req: Request, file: MulterFile, cb: multer.FileFilterCallback) => {
    // Accept only PDFs
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, "Only PDF files allowed")
    }
  }
});