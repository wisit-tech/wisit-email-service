import nodemailer from "nodemailer";

export const mailHotel = async (params: {
  mailId: string;
  subject: string;
  message: string;
}) => {
  console.log(params);

  // Validate email address format
  if (
    !params.mailId ||
    !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(params.mailId)
  ) {
    console.error("Invalid email format:", params.mailId);
    throw new Error("Invalid email format");
  }

  // Ensure environment variables are correctly loaded
  console.log("Email:", process.env.EMAIL, "Password:", process.env.PASSWORD);

  // Create transporter with explicit configuration
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.PASSWORD,
    },
  });

  // Define the mail options
  const mailOptions = {
    from: process.env.EMAIL,
    to: params.mailId,
    subject: params.subject,
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
