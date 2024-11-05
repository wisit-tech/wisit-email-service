import express, { Request, Response } from "express";
import upload from "../api/fileuploader";

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
    res.status(200).json({ message: "File uploaded successfully!", filePath: req.file.path });
  });
});

export default fileUploadRouter;
