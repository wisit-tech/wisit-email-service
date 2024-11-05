import express, { Request, Response } from "express";
import { sendEmailUsingSes } from "../api/amazonSes";

const mailSesRouter = express.Router();

mailSesRouter.post("/mail/ses", async (req: Request, res: Response) => {
  const { mailId, message, subject } = req.body;

  if (!mailId || !message || !subject) {
    return res
      .status(400)
      .send({ message: "mailId, message, and subject are required" });
  }

  try {
    await sendEmailUsingSes({ mailId, message, subject });
    res.status(200).send({ message: "Email sent successfully via AWS SES" });
  } catch (error) {
    console.error("Error sending email via AWS SES:", error);
    res.status(500).send({ message: "Failed to send email" });
  }
});

export default mailSesRouter;
