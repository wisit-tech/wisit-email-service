import express, { Request, Response } from "express";
import { mailHotel } from "../services/nodeEmailService";
import { validateEmailParams } from "../utils/validateEmailParams";

const mailHotelRouter = express.Router();

mailHotelRouter.post(
  "/mail/hotel",
  validateEmailParams,
  async (req: Request, res: Response) => {
    const { mailId, subject, message } = req.body;

    try {
      await mailHotel({ mailId, subject, message });
      res
        .status(200)
        .send({ message: "Email sent successfully via Nodemailer" });
    } catch (error) {
      console.error("Error sending email via Nodemailer:", error);
      res.status(500).send({ message: "Failed to send email" });
    }
  }
);

export default mailHotelRouter;
