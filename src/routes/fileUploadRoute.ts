import express, { Request, Response } from "express";
import { upload } from "../services/fileUploadService";
import { SERVICE_ENDPOINT } from "../utils/constants"; // Import the constant for the service endpoint

const fileUploadRouter = express.Router();

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a file
 *     description: Upload a file to the server.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: file
 *         in: formData
 *         required: true
 *         type: file
 *         description: The file to be uploaded
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
 *                   example: /public/uploads/filename.png
 *       400:
 *         description: Bad request (e.g., no file uploaded or file is invalid)
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

    // Construct the URL for the uploaded file based on the service endpoint
    const fileUrl = `${SERVICE_ENDPOINT}/public/uploads/${req.file.filename}`;

    // Send the success response with the file URL
    res.status(200).json({
      message: "File upload successful",
      fileUrl: fileUrl,
    });
  });
});

export default fileUploadRouter;
