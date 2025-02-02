import multer, { FileFilterCallback } from "multer";
import fs from "fs";
import path from "path";
import { Request } from "express";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "../utils/constants";
import { logger } from "../utils/logger";

const baseUploadDir = "public/uploads/";

const ensureDirectoryExists = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    const folderName = req.body.folderName?.trim();
    let uploadPath = baseUploadDir;

    if (folderName) {
      // Sanitize folder name to prevent directory traversal
      const sanitizedFolderName = folderName.replace(/[^a-zA-Z0-9-_]/g, '_');
      uploadPath = path.join(baseUploadDir, sanitizedFolderName);
    }

    logger.info(`🔍 Absolute upload path: ${path.resolve(uploadPath)}`);
    ensureDirectoryExists(uploadPath);
    cb(null, uploadPath);
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
