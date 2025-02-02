import express, { Request, Response } from "express";
import { upload } from "../services/fileUploadService";
import { SERVICE_ENDPOINT } from "../utils/constants"; // Import the constant for the service endpoint
import { logger } from "../utils/logger";  // Add this import

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
fileUploadRouter.post("/upload", (req: Request, res: Response): void => {
  logger.info(`📝 File upload request received`);
  
  upload.single("file")(req, res, (err) => {
    // Handle errors during the file upload
    if (err) {
      logger.error(`❌ File upload failed: ${err.message}`);
      return res
        .status(400)
        .json({ message: "File upload failed: " + err.message });
    }

    // If no file is uploaded, return an error message
    if (!req.file) {
      logger.warn(`⚠️ No file provided in the request`);
      return res.status(400).json({ message: "No file uploaded!" });
    }

    logger.info(`📁 File received: ${req.file.originalname}`);

    // Get the folder path if it exists
    const folderName = req.body.folderName?.trim();
    logger.info(`📂 Target folder: ${folderName || 'root upload directory'}`);
    
    // Construct the URL using SERVICE_ENDPOINT
    const fileUrl = folderName 
      ? `${SERVICE_ENDPOINT}/public/uploads/${folderName}/${req.file.filename}`
      : `${SERVICE_ENDPOINT}/public/uploads/${req.file.filename}`;

    logger.info(`✅ File successfully uploaded. URL: ${fileUrl}`);

    // Send the success response with the file URL
    res.status(200).json({
      message: "File upload successful",
      fileUrl: fileUrl,
    });
  });
});

export default fileUploadRouter;
