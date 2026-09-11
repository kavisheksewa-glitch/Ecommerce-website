// utils/SendEmail.js
require("dotenv").config();
const nodemailer = require("nodemailer");

// ✅ Transporter ek hi baar banta hai, poore app mein reuse hota hai.
const transporter = nodemailer.createTransport({
  host: "smtp.easyname.com",
  port: 465,// ⚠️ env vars hamesha string hote hain, Number() zaroori hai
  secure: true, // 465 = SSL, 587 = STARTTLS (secure: false)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 20000,
});

// ✅ Server start hote hi call karne ke liye (server.js mein import karke chalao).
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
 */
// const sendOtpEmail = async (toEmail, otp, name = "", purpose = "reset") => {
//   const isVerify = purpose === "verify";

//   const subject = isVerify ? "Verify Your Email Address" : "Your Password Reset OTP";
//   const heading = isVerify ? "Verify Your Email" : "Password Reset Request";
//   const bodyLine = isVerify
//     ? "Apni email verify karne ke liye neeche diya gaya OTP use karein:"
//     : "Aapne password reset ke liye request kiya hai. Neeche diya gaya OTP use karein:";
//   const expiryMinutes = isVerify ? 15 : 10;

//   const mailOptions = {
//     from: `"Kavi Shawls" <${process.env.SMTP_USER}>`,
//     to: toEmail,
//     subject,
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto;">
//         <h2>${heading}</h2>
//         <p>Hi ${name || "there"},</p>
//         <p>${bodyLine}</p>
//         <div style="font-size: 28px; font-weight: bold; letter-spacing: 4px; background:#f4f4f4; padding: 12px 20px; text-align:center; border-radius:6px;">
//           ${otp}
//         </div>
//         <p style="margin-top:16px;">Yeh OTP <b>${expiryMinutes} minutes</b> ke liye valid hai. Agar aapne yeh request nahi ki, is email ko ignore karein.</p>
//       </div>
//     `,
//   };

//   const info = await transporter.sendMail(mailOptions);
//   console.log(`📧 Email sent: messageId=${info.messageId}, response=${info.response}`);
//   return info;
// };

// ⚠️ sendOtpEmail ko DIRECTLY export karo (purani jagah jaisa hi kaam karega:
// const sendOtpEmail = require("../utils/SendEmail")).
// connectSMTP aur transporter ko function ke properties ke tarah attach
// kar diya, taaki server.js mein bhi access ho sake bina structure badle.

module.exports.connectSMTP = connectSMTP;
module.exports.transporter = transporter;