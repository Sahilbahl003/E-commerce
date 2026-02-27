const nodemailer = require("nodemailer");

const sendMail = async (email, otp, subject) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Ecomzy" <${process.env.EMAIL}>`,
      to: email,
      subject: subject,
      html: `<h2>Your OTP is: ${otp}</h2>
             <h3>OTP is valid for 15 min.</h3>`,
    });

    console.log("Email sent");
  } catch (error) {
    console.log("Mail Error:", error.message);
    throw error; 
  }
};

module.exports = sendMail;
