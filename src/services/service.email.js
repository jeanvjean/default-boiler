import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import config from '../config/setup';
import { commonTemplate } from '../lib/templates/lib.template.common';

const MailService = async(subject, type, data) => {
  const transporter = nodemailer.createTransport(smtpTransport({
    service: config.MAIL_SERVICE,
    port: 587,
    secure: false,
    auth: {
      user: config.MAIL_USER,
      pass: config.MAIL_PASSWORD,
    },
  }));

  const mailOptions = {
    from: config.MAIL_FROM,
    to: data.email,
    subject,
    template: commonTemplate(type, data),
    context: data,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`sent using ${mailOptions.from}`);
      console.log(`Message sent: ${info.response}`);
    }
  });
};

export default MailService;
