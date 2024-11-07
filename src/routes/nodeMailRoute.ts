import express, { Request, Response } from "express";
import { mailHotel } from "../services/nodeEmailService";
import { validateEmailParams } from "../utils/validateEmailParams";

const mailHotelRouter = express.Router();

/**
 * @swagger
 * /mail/hotel:
 *   post:
 *     summary: Send an email via Nodemailer
 *     description: Sends an email using the Nodemailer service.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mailId:
 *                 type: string
 *                 example: "recipient@example.com"
 *               subject:
 *                 type: string
 *                 example: "Hello from Nodemailer"
 *               message:
 *                 type: string
 *                 example: "This is a test email sent from Nodemailer."
 *     responses:
 *       200:
 *         description: Email sent successfully via Nodemailer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email sent successfully via Nodemailer"
 *       500:
 *         description: Failed to send email
 */

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
