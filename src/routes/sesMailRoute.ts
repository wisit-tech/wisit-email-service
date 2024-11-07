import express, { Request, Response } from "express";
import { sendEmailUsingSes } from "../services/sesEmailService";
import { validateEmailParams } from "../utils/validateEmailParams";
const mailSesRouter = express.Router();

mailSesRouter.post(
  "/mail/ses",
  validateEmailParams,
  async (req: Request, res: Response) => {
    const { mailId, subject, message } = req.body;

    try {
      await sendEmailUsingSes({ mailId, subject, message });
      res.status(200).send({ message: "Email sent successfully via AWS SES" });
    } catch (error) {
      console.error("Error sending email via AWS SES:", error);
      res.status(500).send({ message: "Failed to send email" });
    }
  }
);

export default mailSesRouter;
