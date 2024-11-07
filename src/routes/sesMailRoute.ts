import express, { Request, Response } from "express";
import { sendEmailUsingSes } from "../services/sesEmailService";
import { validateEmailParams } from "../utils/validateEmailParams";
const mailSesRouter = express.Router();

/**
 * @swagger
 * /mail/ses:
 *   post:
 *     summary: Send an email via AWS SES
 *     description: Sends an email using Amazon's Simple Email Service (SES).
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
 *                 example: "Hello from AWS SES"
 *               message:
 *                 type: string
 *                 example: "This is a test email sent from AWS SES."
 *     responses:
 *       200:
 *         description: Email sent successfully via AWS SES
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email sent successfully via AWS SES"
 *       500:
 *         description: Failed to send email
 */

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
