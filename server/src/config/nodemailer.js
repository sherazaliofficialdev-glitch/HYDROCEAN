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
      // ✅ Add these to avoid rate limiting
      pool: true,
      maxConnections: 1,
      maxMessages: 5,
      rateDelta: 5000, // 5 seconds between messages
      rateLimit: 5, // Max 5 messages per rateDelta
      tls: {
        rejectUnauthorized: false,
      },
    });
    
    // Verify connection
    transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Email transporter error:', error.message);
      } else {
        console.log('✅ Email transporter ready');
      }
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