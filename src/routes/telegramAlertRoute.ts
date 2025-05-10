import express, { Request, Response } from "express";
import { sendTelegramAlert } from "../services/telegramService";
import { logger } from "../utils/logger";

const telegramRouter = express.Router();

/**
 * @swagger
 * /telegram/alert:
 *   post:
 *     summary: Send a Telegram alert
 *     description: Send an alert message to a Telegram chat or channel using the configured Telegram Bot API.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               channelId:
 *                 type: string
 *                 description: The Telegram chat or channel ID where the alert will be sent.
 *                 example: "-123456789"
 *               message:
 *                 type: string
 *                 description: The alert message to be sent.
 *                 example: "This is a test alert from the server!"
 *     responses:
 *       200:
 *         description: Telegram alert sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Telegram alert sent successfully.
 *       400:
 *         description: "Invalid request: Missing channelId or message."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request: Missing channelId or message."
 *       500:
 *         description: Failed to send Telegram alert due to an internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to send Telegram alert.
 */
telegramRouter.post("/telegram/alert", async (req: Request, res: Response) => {
  try {
    const { channelId, message } = req.body;
    logger.info("🚀 Telegram alert request initiated");

    if (!channelId || !message) {
      logger.warn("⚠️ Missing channelId or message in request");
      return res.status(400).json({ message: "Invalid request: Missing channelId or message." });
    }

    await sendTelegramAlert(channelId, message);
    logger.info(`✅ Telegram alert successfully sent to channel ${channelId}`);
    res.status(200).json({ message: "Telegram alert sent successfully." });
  } catch (error: unknown) {
    logger.error(`❌ Error sending Telegram alert: ${error}`);
    res.status(500).json({
      message: "Failed to send Telegram alert.",
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

export default telegramRouter;
