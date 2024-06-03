const nodemailer = require("nodemailer");

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASS,
  },
});

exports.sendMail = async (to, sub, text) => {
  try {
    // Email content
    const recipients = Array.isArray(to) ? to : [to];
    const mailOptions = {
      from: process.env.GMAIL_ID,
      to: recipients,
      subject: sub,
      text: text,
    };

    // Send email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (err) {
    console.log("Mail Sent Error");
  }
};
