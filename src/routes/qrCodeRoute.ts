import express, { Request, Response } from "express";
import QRCode from "qrcode";
import path from "path";
import fs from "fs";
import { SERVICE_ENDPOINT } from "../utils/constants";
import { logger } from "../utils/logger";

const qrCodeRouter = express.Router();

/**
 * @swagger
 * /get-qr:
 *   post:
 *     summary: Generate QR Code for a link
 *     description: Generates a QR code image for the provided link and saves it
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               link:
 *                 type: string
 *                 description: The URL to encode in QR
 *                 example: "https://wisit.space"
 *               darkColor:
 *                 type: string
 *                 description: Color of QR code (hex format)
 *                 example: "#000000"
 *                 required: false
 *               lightColor:
 *                 type: string
 *                 description: Background color (hex format)
 *                 example: "#ffffff"
 *                 required: false
 *     responses:
 *       200:
 *         description: QR Code generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 qrUrl:
 *                   type: string
 */
qrCodeRouter.post("/get-qr", async (req: Request, res: Response) => {
  try {
    const { link, darkColor = '#000000', lightColor = '#ffffff' } = req.body;
    
    if (!link || !isValidUrl(link)) {
      logger.warn(`❌ Invalid URL provided: ${link}`);
      return res.status(400).json({ message: "Valid URL is required" });
    }

    logger.info(`📝 Generating QR code for link: ${link}`);
    logger.info(`🎨 Colors - Dark: ${darkColor}, Light: ${lightColor}`);

    // Ensure QR directory exists
    const qrDir = "public/uploads/qr";
    if (!fs.existsSync(qrDir)) {
      fs.mkdirSync(qrDir, { recursive: true });
      logger.info(`📁 Created QR directory: ${qrDir}`);
    }

    // Generate unique filename
    const filename = `qr-${Date.now()}.png`;
    const filePath = path.join(qrDir, filename);

    // Generate QR code with custom colors
    await QRCode.toFile(filePath, link, {
      errorCorrectionLevel: 'H',
      margin: 1,
      width: 400,
      color: {
        dark: darkColor,
        light: lightColor
      }
    });

    // Add file size check after generation
    const stats = fs.statSync(filePath);
    logger.info(`📊 QR Code size: ${stats.size / 1024}KB`);

    logger.info(`✅ QR Code generated: ${filename}`);

    // Construct URL
    const qrUrl = `${SERVICE_ENDPOINT}/public/uploads/qr/${filename}`;

    res.status(200).json({
      message: "QR Code generated successfully",
      qrUrl
    });

  } catch (error: unknown) {
    logger.error(`❌ QR generation failed: ${error}`);
    res.status(500).json({ 
      message: "Failed to generate QR code",
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Add helper function
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export default qrCodeRouter; 