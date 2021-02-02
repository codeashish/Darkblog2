const sgMail = require("@sendgrid/mail");

const env = require("dotenv");
env.config();
const apikey =process.env.SENDGRID_API_KEY;
sgMail.setApiKey(apikey);
const html=require('./html')
const sendWelcomeEmail = (user, link) => {
  const template=html(user,link)
  sgMail.send({
    
    to: user.email,
    from: "amishguleria9977@gmail.com",
    subject: "Darkblog  Signup",
    text: "Welcome to darkblog",
    html: template,
  });
};







module.exports = {
  sendWelcomeEmail,
};
