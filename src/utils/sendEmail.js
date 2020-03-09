const nodemailer = require("nodemailer");

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  FROM_EMAIL,
  FROM_NAME,
} = process.env;

const sendEmail = async options => {
  const { email, subject, message } = options;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_PASSWORD,
    },
  });
  const transportedMessage = {
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: email,
    subject,
    text: message,
  };
  const info = await transporter.sendMail(transportedMessage);
  console.log(`Message sent: ${info.messageId}`);
};

module.exports = sendEmail;
