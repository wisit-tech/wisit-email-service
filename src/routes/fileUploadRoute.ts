import express, { Request, Response } from "express";
import { upload } from "../services/fileUploadService";
import { SERVICE_ENDPOINT } from "../utils/constants"; // Import the constant for the service endpoint
import { logger } from "../utils/logger";  // Add this import
import path from "path";

const fileUploadRouter = express.Router();
/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a file
 *     description: Upload a file to the server. Optionally specify a folder name to organize uploads.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to be uploaded
 *               folderName:
 *                 type: string
 *                 description: Optional folder name to organize uploads (allows alphanumeric characters, hyphens, and underscores)
 *                 example: "customer_documents"
 *                 required: false
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: File uploaded successfully!
 *                 fileUrl:
 *                   type: string
 *                   example: /public/uploads/customer_documents/1234567890-document.pdf
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: File upload failed - Invalid file type or no file provided
 *       500:
 *         description: Internal server error
 */

// File upload route
fileUploadRouter.post("/upload", (req: Request, res: Response) => {
  logger.info(`📝 File upload request initiated`);
  
  // Handle the file upload
  upload.single("file")(req, res, async (err) => {
    try {
      if (err) {
        logger.error(`❌ Upload middleware error: ${err.message}`);
        return res.status(400).json({ 
          message: "File upload failed", 
          error: err.message 
        });
      }

      if (!req.file) {
        logger.warn("⚠️ No file provided in request");
        return res.status(400).json({ message: "No file uploaded!" });
      }

      logger.info(`📁 File received: ${req.file.originalname}`);
      logger.info(`💾 File saved as: ${req.file.filename}`);
      logger.info(`📂 File saved in: ${req.file.destination}`);

      const folderName = req.body.folderName?.trim();
      const fileUrl = folderName 
        ? path.join(SERVICE_ENDPOINT, 'public/uploads', folderName, req.file.filename)
        : path.join(SERVICE_ENDPOINT, 'public/uploads', req.file.filename);

      logger.info(`🔗 Generated URL: ${fileUrl}`);

      res.status(200).json({
        message: "File upload successful",
        fileUrl: fileUrl.replace(/\\/g, '/'), // Ensure forward slashes for URLs
        originalName: req.file.originalname,
        size: req.file.size,
        folder: folderName || 'root'
      });

    } catch (error: unknown) {
      logger.error(`❌ Unexpected error: ${error}`);
      res.status(500).json({ 
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
});

export default fileUploadRouter;
