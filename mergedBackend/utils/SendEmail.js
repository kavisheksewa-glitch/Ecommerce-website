// const nodemailer = require("nodemailer");

// // Gmail SMTP use kar rahe hain. .env me EMAIL_USER aur EMAIL_PASS set karna hoga.
// // EMAIL_PASS normal Gmail password nahi — "App Password" hona chahiye
// // (Google Account -> Security -> 2-Step Verification -> App Passwords).
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// /**
//  * OTP email bhejta hai customer ko — email verification aur password reset dono ke liye
//  * @param {string} toEmail
//  * @param {string} otp - plain text 6-digit OTP
//  * @param {string} name - customer ka naam (greeting ke liye)
//  * @param {"verify"|"reset"} purpose - kis wajah se OTP bheja ja raha hai
//  */
// const sendOtpEmail = async (toEmail, otp, name = "", purpose = "reset") => {
//   const isVerify = purpose === "verify";

//   const subject = isVerify ? "Verify Your Email Address" : "Your Password Reset OTP";
//   const heading = isVerify ? "Verify Your Email" : "Password Reset Request";
//   const bodyLine = isVerify
//     ? "Apni email verify karne ke liye neeche diya gaya OTP use karein:"
//     : "Aapne password reset ke liye request kiya hai. Neeche diya gaya OTP use karein:";
//   const expiryMinutes = isVerify ? 15 : 10;

//   const mailOptions = {
//     from: `"Kavi Shawls" <${process.env.EMAIL_USER}>`,
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

//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendOtpEmail;



//8 sept




const nodemailer = require("nodemailer");

// Gmail SMTP use kar rahe hain. .env me EMAIL_USER aur EMAIL_PASS set karna hoga.
// EMAIL_PASS normal Gmail password nahi — "App Password" hona chahiye
// (Google Account -> Security -> 2-Step Verification -> App Passwords).
//
// ⚠️ IMPORTANT: Agar deploy Render (ya kisi bhi hosting) par hai, to
// EMAIL_USER aur EMAIL_PASS Render Dashboard -> Environment tab mein bhi
// set hone chahiye. .env file sirf local machine par kaam karti hai.

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 15000, // 15 sec - connection establish karne ka max time
  greetingTimeout: 15000,   // 15 sec - SMTP server se greeting ka max wait
  socketTimeout: 20000,     // 20 sec - overall socket inactivity timeout
});

// Startup par ek baar SMTP connection verify karo — server start hote hi
// pata chal jayega ki credentials sahi hain ya nahi (Render logs mein dikhega).
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP connection failed on startup. Emails will NOT be sent:", error);
  } else {
    console.log("✅ SMTP server is ready to send emails.");
  }
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

  const info = await transporter.sendMail(mailOptions);
  console.log(`📧 Email sent: messageId=${info.messageId}, response=${info.response}`);
  return info;
};

module.exports = sendOtpEmail;