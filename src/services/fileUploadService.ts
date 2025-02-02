import multer, { FileFilterCallback } from "multer";
import fs from "fs";
import path from "path";
import { Request } from "express";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "../utils/constants";
import { logger } from "../utils/logger";

const baseUploadDir = "public/uploads";

// Ensure base upload directory exists
if (!fs.existsSync(baseUploadDir)) {
  fs.mkdirSync(baseUploadDir, { recursive: true });
  logger.info(`📁 Created base upload directory: ${baseUploadDir}`);
}

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    let uploadPath = baseUploadDir;
    try {
      logger.info(`📝 Processing upload request for file: ${file.originalname}`);
      
      const folderName = req.body.folderName?.trim();

      if (folderName) {
        if (!/^[a-zA-Z0-9-_]+$/.test(folderName)) {
          logger.warn(`⚠️ Invalid folder name: ${folderName}`);
          return cb(new Error("Invalid folder name. Use only letters, numbers, hyphens, and underscores."), "");
        }

        uploadPath = path.join(baseUploadDir, folderName);
        
        if (!fs.existsSync(uploadPath)) {
          logger.info(`📁 Creating directory: ${uploadPath}`);
          fs.mkdirSync(uploadPath, { recursive: true });
          logger.info(`✅ Directory created successfully`);
        }
        
        logger.info(`📂 Using custom folder: ${folderName}`);
      }

      logger.info(`📂 Final upload path: ${uploadPath}`);
      cb(null, uploadPath);
    } catch (error) {
      logger.error(`❌ Error in destination handler: ${error}`);
      cb(error as Error, uploadPath);
    }
  },

  filename: (req: Request, file, cb) => {
    try {
      const originalName = file.originalname.toLowerCase();
      const sanitizedName = originalName.replace(/[^a-z0-9.-]/g, '_');
      const timestamp = Date.now();
      const finalName = `${timestamp}-${sanitizedName}`;
      
      logger.info(`📄 Generated filename: ${finalName}`);
      cb(null, finalName);
    } catch (error) {
      logger.error(`❌ Error in filename handler: ${error}`);
      cb(error as Error, file.originalname);
    }
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  try {
    const isAllowed = ALLOWED_FILE_TYPES.test(file.originalname.toLowerCase());
    if (isAllowed) {
      logger.info(`✅ File type accepted: ${file.originalname}`);
      cb(null, true);
    } else {
      logger.warn(`❌ Invalid file type: ${file.originalname}`);
      cb(new Error(`Invalid file type. Allowed types: ${ALLOWED_FILE_TYPES}`));
    }
  } catch (error) {
    logger.error(`❌ Error in file filter: ${error}`);
    cb(error as Error);
  }
};

const upload = multer({
  storage: storage,
  limits: { 
    fileSize: MAX_FILE_SIZE,
    files: 1 // Allow only 1 file per request
  },
  fileFilter: fileFilter,
});

export { upload };
