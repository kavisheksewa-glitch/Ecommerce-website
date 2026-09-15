
const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

const sendOtpEmail = async (
  toEmail,
  otp,
  fullName = "Customer"
) => {
  try {
    const result = await brevo.transactionalEmails.sendTransacEmail({
      sender: {
        name: process.env.BREVO_FROM_NAME || "Kavi Shawls",
        email: process.env.BREVO_FROM_EMAIL,
      },

      to: [
        {
          email: toEmail,
          name: fullName,
        },
      ],

      subject: "Verify your email - OTP Code",

      htmlContent: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 480px;
          margin: 30px auto;
          padding: 25px;
          border: 1px solid #ddd;
          border-radius: 10px;
        ">

          <h2 style="margin-bottom: 20px;">
            Kavi Shawls - Email Verification
          </h2>

          <p>Hi ${fullName},</p>

          <p>
            Thank you for registering with Kavi Shawls.
            Use the OTP below to verify your email:
          </p>

          <div style="
            text-align: center;
            margin: 25px 0;
          ">
            <h1 style="
              letter-spacing: 8px;
              font-size: 32px;
            ">
              ${otp}
            </h1>
          </div>

          <p>
            This OTP is valid for <b>180 seconds</b> only.
          </p>

          <p>
            If you did not request this, please ignore this email.
          </p>

          <hr />

          <p style="font-size: 12px; color: #777;">
            © Kavi Shawls
          </p>

        </div>
      `,
    });

    console.log(
      "OTP Email sent successfully via Brevo:",
      result
    );

    return result;
  } catch (error) {
    console.error(
      "Error sending OTP email with Brevo:",
      error
    );

    throw error;
  }
};

module.exports = { sendOtpEmail };