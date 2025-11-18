const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // App password
  },
});

async function sendEmail({ to, subject, text, html }) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };
