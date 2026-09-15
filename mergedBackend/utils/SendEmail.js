// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT) || 465,
//   secure: true, // true for port 465 (SSL/TLS)
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// const sendOtpEmail = async (toEmail, otp, fullName = "Customer") => {
//   const mailOptions = {
//     from: `"Kavi Shawls" <${process.env.SMTP_USER}>`,
//     to: toEmail,
//     subject: "Verify your email - OTP Code",
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 480px; margin:auto;">
//         <h2>Kavi Shawls - Email Verification</h2>
//         <p>Hi ${fullName},</p>
//         <p>Thank you for registering. Use the OTP below to verify your email:</p>
//         <h1 style="letter-spacing: 6px;">${otp}</h1>
//         <p>This OTP is valid for <b>180 seconds</b> only.</p>
//         <p>If you did not request this, please ignore this email.</p>
//       </div>
//     `,
//   };

//   await transporter.sendMail(mailOptions);
// };

// module.exports = { sendOtpEmail };



//resend



import { Resend } from 'resend';

// Resend client initialize karo using environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

const sendOtpEmail = async (toEmail, otp, fullName = "Customer") => {
  try {
    const data = await resend.emails.send({
      // Free testing ke liye 'onboarding@resend.dev' use hota hai
      // (Jab aap domain verify karloge tab 'Kavi Shawls <support@yourdomain.com>' use kar sakte ho)
      from: 'Kavi Shawls <onboarding@resend.dev>',
      to: toEmail,
      subject: "Verify your email - OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin:auto;">
          <h2>Kavi Shawls - Email Verification</h2>
          <p>Hi ${fullName},</p>
          <p>Thank you for registering. Use the OTP below to verify your email:</p>
          <h1 style="letter-spacing: 6px;">${otp}</h1>
          <p>This OTP is valid for <b>180 seconds</b> only.</p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
    });

    console.log("OTP Email sent successfully via Resend:", data);
    return data;
  } catch (error) {
    console.error("Error sending OTP email with Resend:", error);
    throw error;
  }
};

export { sendOtpEmail };