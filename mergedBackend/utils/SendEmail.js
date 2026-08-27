const nodemailer = require("nodemailer");

// Gmail SMTP use kar rahe hain. .env me EMAIL_USER aur EMAIL_PASS set karna hoga.
// EMAIL_PASS normal Gmail password nahi — "App Password" hona chahiye
// (Google Account -> Security -> 2-Step Verification -> App Passwords).
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * OTP email bhejta hai customer ko — email verification aur password reset dono ke liye
 * @param {string} toEmail
 * @param {string} otp - plain text 6-digit OTP
 * @param {string} name - customer ka naam (greeting ke liye)
 * @param {"verify"|"reset"} purpose - kis wajah se OTP bheja ja raha hai
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

  await transporter.sendMail(mailOptions);
};

module.exports = sendOtpEmail;