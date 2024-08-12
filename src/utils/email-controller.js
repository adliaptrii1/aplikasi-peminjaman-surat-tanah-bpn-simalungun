const nodemailer = require('nodemailer');
require('dotenv').config();

// Konfigurasi transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,  
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS_APP,
  }
});

// Fungsi untuk mengirim email
const sendPasswordConfirmationEmail = async (toEmail, newPassword) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Konfirmasi Password Baru',
    text: `Silahkan klik link dibawah ini\n
    http://localhost:3000/reset-password?token=${newPassword}`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = sendPasswordConfirmationEmail;


