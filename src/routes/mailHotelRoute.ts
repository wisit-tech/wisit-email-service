import express, { Request, Response } from "express";
import { mailHotel } from "../api/email";

const mailHotelRouter = express.Router();

mailHotelRouter.post("/mail/hotel", (req: Request, res: Response) => {
  const { mailId, subject, message } = req.body;

  if (!mailId || !subject || !message) {
    return res
      .status(400)
      .send({ message: "mailId, subject, and message are required" });
  }

  try {
    mailHotel({ mailId, subject, message });
    res.status(200).send({ message: "Email sent successfully via Nodemailer" });
  } catch (error) {
    console.error("Error sending email via Nodemailer:", error);
    res.status(500).send({ message: "Failed to send email" });
  }
});

export default mailHotelRouter;
