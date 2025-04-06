const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jaymeendevatka@gmail.com",        // Replace with your Gmail
    pass: "icsm qprd blpj stkz"            // App password (not your Gmail password)
  }
});

function sendOTPEmail(to, otp) {
  const mailOptions = {
    from: "jaymeendevatka@gmail.com",
    to,
    subject: "NSSConnect OTP Verification",
    text: `Your OTP for NSSConnect is: ${otp}
          
            Prepared by Jaymeen Devatka
            
            NSS * Charusat`
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendOTPEmail };
