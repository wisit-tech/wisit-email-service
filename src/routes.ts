import express from "express";
import { mailHotel } from "./api/email";
import { sendEmailUsingSes } from "./api/amazonSes";
import { Request, Response } from "express";


const router = express.Router();


// Route for sending mail using Nodemailer
router.post("/mail/hotel", (req: Request, res: Response) => {
  const { mailId, subject, message } = req.body; 

  if (!mailId || !subject || !message) {
    return res.status(400).send({ message: "mailId, subject, and message are required" });
  }

  try {
    mailHotel({ mailId, subject, message });
    res.status(200).send({ message: "Email sent Successfully" });
  } catch (error) {
    console.error("Error sending email via Nodemailer:", error);
    res.status(500).send({ message: "Failed to send email" });
  }
});

// Route for sending mail using AWS SES
router.post("/mail/ses", async (req: Request, res: Response) => {
  const { mailId, message, subject } = req.body; 
  // Check if mailId, message, and subject are provided
  if (!mailId || !message || !subject) {
    return res
      .status(400)
      .send({ message: "mailId, message, and subject are required" });
  }

  try {
    // Call the sendEmailUsingSes function with mailId, message, and subject
    await sendEmailUsingSes({ mailId, message, subject });
    res.status(200).send({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email via AWS SES:", error);
    res.status(500).send({ message: "Failed to send email" });
  }
});


export default router;
