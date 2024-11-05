import express, { Request, Response } from "express";
import { upload } from "../api/fileuploader";

const fileUploadRouter = express.Router();

// Define the uploadFile function and route in one file
fileUploadRouter.post("/upload", (req: Request, res: Response): void => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    // Construct the URL for the uploaded file
    const fileUrl = `/public/uploads/${req.file.filename}`;

    // temporary till we get SSH to update the env file with the SERVICE_ENDPOINT var
    // const fileUrl = `${process.env.SERVICE_ENDPOINT}/public/uploads/${req.file.filename}`;

    // Send the response with the URL
    res
      .status(200)
      .json({ message: "File uploaded successfully!", fileUrl: fileUrl });
  });
});

export default fileUploadRouter;
