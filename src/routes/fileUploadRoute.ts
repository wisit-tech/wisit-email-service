import express, { Request, Response } from "express";
import { upload } from "../services/fileUploadService";
import { SERVICE_ENDPOINT } from "../utils/constants"; // Import the constant for the service endpoint

const fileUploadRouter = express.Router();

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
