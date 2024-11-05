import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

// Define the upload directory path
const uploadDir = "public/uploads/";

const ensureUploadDirExists = () => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
};

// Define the storage location and filename format
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    ensureUploadDirExists(); // Ensure the directory exists before saving the file
    cb(null, uploadDir); // Specify the upload folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Define file filter based on allowed file types
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = /\.(png|jpeg|jpg|pdf|docx|txt)$/;
  if (allowedTypes.test(file.originalname.toLowerCase())) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Unsupported file type! Please upload PNG, JPEG, PDF, DOCX, or TXT files."
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

export default upload;
