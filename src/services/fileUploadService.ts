import multer, { FileFilterCallback } from "multer";
import fs from "fs";
import { Request } from "express";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "../utils/constants";

const uploadDir = "public/uploads/";

const ensureUploadDirExists = () => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    ensureUploadDirExists();
    cb(null, uploadDir);
  },
  filename: (req: Request, file, cb) => {
    const sanitizedFileName = file.originalname.replace(/\s+/g, "_");
    cb(null, `${Date.now()}-${sanitizedFileName}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (ALLOWED_FILE_TYPES.test(file.originalname.toLowerCase())) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Unsupported file type! Please upload PNG, JPEG, SVG, PDF, DOCX, or TXT files."
      )
    );
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: fileFilter,
});

export { upload };
