const nodemailer = require("nodemailer");
const dns = require("dns");

// Force Node to prefer IPv4 DNS results — fixes ENETUNREACH on Render
// when smtp.gmail.com resolves to an IPv6 address the host can't route to.
dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,   // true for port 465, false for 587
  family: 4,      // force IPv4 socket, belt-and-suspenders alongside dns fix
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 20000,
});