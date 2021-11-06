const sgMail = require('@sendgrid/mail');
require('dotenv').config;

const { SENDGRID_API_KEY } = process.env;

const sendEmail = async (data) => {
  sgMail.setApiKey(SENDGRID_API_KEY);
  const email = { ...data, from: 'jaroslav.prokudin@gmail.com' };
  return await sgMail.send(email);
};

module.exports = {
  sendEmail
}