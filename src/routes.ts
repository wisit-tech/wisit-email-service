import express from "express";
import { mailHotel } from "./api/email";
import { sendEmailUsingSes } from "./api/amazonSes";
import { Request, Response } from "express";

const router = express.Router();
router.post("/mailHotel", (req, res) => {
  mailHotel(req.query);
  res.status(200).send({ message: "Email sent Successfully" });
});

router.get("/mail-using-amazon", async (req: Request, res: Response) => {
  const mailId = req.query.mailId as string; // Assert as string
  const message = req.query.message as string; // Assert as string
  const subject = req.query.subject as string
  // Check if mailId and message are provided
  if (!mailId || !message) {
    return res
      .status(400)
      .send({ message: "Both mailId and message are required" });
  }

  try {
    // Call the sendEmailUsingSes function with the mailId and message
    await sendEmailUsingSes({ mailId, message, subject });
    res.status(200).send({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ message: "Failed to send email" });
  }
});

export default router;
