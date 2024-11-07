import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express"; // Ensure you're importing Response from express

// Define the upload directory path
const uploadDir = "public/uploads/";

// Ensure the upload directory exists
const ensureUploadDirExists = () => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
};

// Define the storage location and filename format
const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    ensureUploadDirExists(); // Ensure the directory exists before saving the file
    cb(null, uploadDir); // Specify the upload folder
  },
  filename: (req: Request, file, cb) => {
    const ext = path.extname(file.originalname);
    // Remove spaces from the original file name and use Date.now() to generate a timestamp-based filename
    const sanitizedFileName = file.originalname.replace(/\s+/g, "_"); // Replace spaces with underscores
    cb(null, `${Date.now()}-${sanitizedFileName}`); // Use the sanitized file name
  },
});

// Define file filter based on allowed file types
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = /\.(png|jpeg|jpg|pdf|docx|txt|svg)$/;
  if (allowedTypes.test(file.originalname.toLowerCase())) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Unsupported file type! Please upload PNG, JPEG, SVG, PDF, DOCX, or TXT files."
      )
    );
  }
};

// Set up multer with storage, limits, and file filter
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000, // 5MB
  },
  fileFilter: fileFilter,
});

export { upload };
