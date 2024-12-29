import express, { Request, Response } from "express";
import { upload } from "../services/fileUploadService";
import { SERVICE_ENDPOINT } from "../utils/constants"; // Import the constant for the service endpoint

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
 *                   example: /uploads/customer_documents/1234567890-document.pdf
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
  upload.single("file")(req, res, (err) => {
    // Handle errors during the file upload
    if (err) {
      return res
        .status(400)
        .json({ message: "File upload failed: " + err.message });
    }

    // If no file is uploaded, return an error message
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    // Get the relative path from the req.file.path
    const relativePath = req.file.path.replace(/^public\//, '');
    
    // Construct the URL for the uploaded file based on the service endpoint
    const fileUrl = `${SERVICE_ENDPOINT}/${relativePath}`;

    // Send the success response with the file URL
    res.status(200).json({
      message: "File upload successful",
      fileUrl: fileUrl,
    });
  });
});

export default fileUploadRouter;
