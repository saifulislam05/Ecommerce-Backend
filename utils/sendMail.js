import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendMailHandler = async (to, subject, text, html) => {
  // Removed `res` parameter for separation of concerns
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_KEY,
    },
  });
  const info = await transporter.sendMail({
    to, // Simplified object property assignment
    subject,
    text,
    html,
  });

  console.log("Message sent: %s", info.messageId);
  return info; // Return the info object to handle the response in the controller
};

export default sendMailHandler; // Use ES Module export
