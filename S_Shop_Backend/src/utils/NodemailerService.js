import transporter from "../config/SetupNodemailer";

export const sendEmail = (to, subject, text) => {
  const mailOption = {
    from: process.env.NODEMAILER_EMAIL,
    to: to,
    subject: subject,
    text: text,
  };
  transporter.sendMail(mailOption);
};

