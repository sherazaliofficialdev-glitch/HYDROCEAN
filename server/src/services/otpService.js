import OTP from '../models/OTP.js';
import { sendEmail } from '../config/nodemailer.js';

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ✅ Add delay between OTP sends
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const sendOTP = async (email, otp, purpose = 'registration') => {
  const subject = purpose === 'registration' 
    ? 'Verify Your Email - Wave pilot'
    : 'Reset Your Password - Wave pilot';

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0f172a; color: #f8fafc; border-radius: 16px;">
      <h1 style="color: #0ea5e9; text-align: center;">HYDROCEAN</h1>
      <h2 style="text-align: center;">${purpose === 'registration' ? 'Email Verification' : 'Password Reset'}</h2>
      <p style="text-align: center; font-size: 16px;">Your OTP code is:</p>
      <div style="text-align: center; background: #1e293b; padding: 16px; border-radius: 12px; margin: 20px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #0ea5e9;">${otp}</span>
      </div>
      <p style="text-align: center; color: #94a3b8; font-size: 14px;">This code will expire in 5 minutes.</p>
      <p style="text-align: center; color: #64748b; font-size: 12px; margin-top: 20px;">If you didn't request this, please ignore this email.</p>
    </div>
  `;

  console.log(`🔑 OTP for ${email}: ${otp}`);

  try {
    // ✅ Add delay before sending to avoid rate limiting
    await delay(2000);
    await sendEmail({
      to: email,
      subject,
      html,
    });
    console.log(`✅ OTP sent to ${email}`);
  } catch (error) {
    console.error(`❌ Email send failed: ${error.message}`);
    console.log(`🔑 OTP for ${email}: ${otp}`);
  }
};

export const saveOTP = async (email, otp, purpose = 'registration') => {
  // ✅ Delete old OTPs for this email
  await OTP.deleteMany({ email, purpose, isUsed: false });
  
  const otpDoc = new OTP({
    email,
    otp,
    purpose,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });
  
  await otpDoc.save();
  return otpDoc;
};

export const verifyOTP = async (email, otp, purpose = 'registration') => {
  const otpDoc = await OTP.findOne({
    email,
    otp,
    purpose,
    isUsed: false,
    expiresAt: { $gt: new Date() },
  });

  if (!otpDoc) {
    throw new Error('Invalid or expired OTP.');
  }

  otpDoc.isUsed = true;
  await otpDoc.save();

  return otpDoc;
};