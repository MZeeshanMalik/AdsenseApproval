const nodemailer = require("nodemailer");

const sendEmail = async(options) => {
  // create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME, // fastmail email as smtp server user
      pass: process.env.EMAIL_PASSWORD, // fastmail app password
    },
  });
  const mailOptions = {
    from: 'zeeshan@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message
  };
  await transporter.sendMail(mailOptions)
};
module.exports = sendEmail;
