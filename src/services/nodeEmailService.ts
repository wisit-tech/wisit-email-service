import nodemailer from "nodemailer";
import { isValidEmail } from "../utils/validators";
import { config } from "../utils/config";

export const mailHotel = async (params: {
  mailId: string;
  subject: string;
  message: string;
}) => {
  console.log(params);

  // Validate email address format
  if (!isValidEmail(params.mailId)) {
    console.error("Invalid email format:", params.mailId);
    throw new Error("Invalid email format");
  }
  // Create transporter with explicit configuration
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.email.id,
      pass: config.email.password,
    },
  });

  // Define the mail options
  const mailOptions = {
    from: process.env.EMAIL,
    to: params.mailId,
    subject: params.subject,
    html: params.message,
    text: params.message,
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info; // Optionally return the info
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
