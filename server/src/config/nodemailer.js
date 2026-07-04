import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const hasCredentials = process.env.EMAIL_USER && process.env.EMAIL_PASS;

let transporter = null;

if (hasCredentials) {
  try {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER.trim(),
        pass: process.env.EMAIL_PASS.trim(),
      },

      // 🚀 FAST & OPTIMIZED SETTINGS
      pool: true,
      maxConnections: 5,
      maxMessages: 100,

      tls: {
        rejectUnauthorized: false,
      },
    });

    // ⚡ Non-blocking verify (DOES NOT slow API)
    transporter.verify()
      .then(() => {
        console.log('✅ Email transporter ready');
      })
      .catch((error) => {
        console.error('❌ Email transporter error:', error.message);
      });

  } catch (error) {
    console.error('❌ Email configuration error:', error.message);
  }
}

export const sendEmail = async ({ to, subject, html }) => {
  if (!transporter) {
    console.log('📧 ===== EMAIL (TEST MODE) =====');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log('===============================');
    return { messageId: 'test-mode-' + Date.now() };
  }

  try {
    const info = await transporter.sendMail({
      from: `"Hydrocean Marine" <${process.env.EMAIL_USER.trim()}>`,
      to,
      subject,
      html,
    });

    console.log(`✅ Email sent to ${to}`);
    return info;

  } catch (error) {
    console.error(`❌ Email Error: ${error.message}`);
    throw error;
  }
};

export default transporter;