// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// javascript;
module.exports = async function sendGridEmailSender(option) {
  const sgMail = require("@sendgrid/mail");

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: option.to, // Change to your recipient
    from: "17b1num0351@stud.num.edu.mn", // Change to your verified sender
    subject: "Нууц үг сэргээх",
    text: "and easy to do anywhere, even with Node.js",
    html: option.html,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
