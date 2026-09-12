// utils/SendEmail.js
require("dotenv").config();
const nodemailer = require("nodemailer");

// ✅ Transporter ek hi baar banta hai, poore app mein reuse hota hai.
// ⚠️ IMPORTANT: "host" neeche apne actual email provider ke hisaab se badlo.
// Agar eksewa.com Hostinger pe hai to host = "smtp.hostinger.com"
// Agar Zoho pe hai to host = "smtp.zoho.com"
// Agar cPanel/WHM pe hai to host = "mail.eksewa.com" (apne provider se confirm karo)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.easyname.com", // 👈 YAHAN CONFIRM KARKE BADALNA HAI
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // 465 = SSL (secure: true), 587 = STARTTLS (secure: false)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 20000,
});

// ✅ Server start hote hi call hota hai (server.js mein already ho raha hai)
const connectSMTP = async () => {
  try {
    await transporter.verify();
    console.log("✅ SMTP Connected successfully");
  } catch (error) {
    console.error("❌ SMTP Connection Failed:", error.message);
  }
};

/**
 * OTP email bhejta hai customer ko — email verification aur password reset dono ke liye
 * @param {string} toEmail - jisko email jana hai
 * @param {string} otp - 6 digit OTP
 * @param {string} name - customer ka naam
 * @param {"verify"|"reset"} purpose - kis wajah se email bhej rahe hain
 */
const sendOtpEmail = async (toEmail, otp, name = "", purpose = "reset") => {
  const isVerify = purpose === "verify";

  const subject = isVerify ? "Verify Your Email Address" : "Your Password Reset OTP";
  const heading = isVerify ? "Verify Your Email" : "Password Reset Request";
  const bodyLine = isVerify
    ? "Apni email verify karne ke liye neeche diya gaya OTP use karein:"
    : "Aapne password reset ke liye request kiya hai. Neeche diya gaya OTP use karein:";
  const expiryMinutes = isVerify ? 15 : 10;

  const mailOptions = {
    from: `"Kavi Shawls" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto;">
        <h2>${heading}</h2>
        <p>Hi ${name || "there"},</p>
        <p>${bodyLine}</p>
        <div style="font-size: 28px; font-weight: bold; letter-spacing: 4px; background:#f4f4f4; padding: 12px 20px; text-align:center; border-radius:6px;">
          ${otp}
        </div>
        <p style="margin-top:16px;">Yeh OTP <b>${expiryMinutes} minutes</b> ke liye valid hai. Agar aapne yeh request nahi ki, is email ko ignore karein.</p>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`📧 Email sent: messageId=${info.messageId}, response=${info.response}`);
  return info;
};

module.exports = { connectSMTP, transporter, sendOtpEmail };