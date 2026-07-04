import { sendEmail } from '../config/nodemailer.js';

export const sendWelcomeEmail = async (email, name) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0f172a; color: #f8fafc; border-radius: 16px;">
      <h1 style="color: #0ea5e9; text-align: center;">HYDROCEAN</h1>
      <h2 style="text-align: center;">Welcome to Wave pilot!</h2>
      <p style="text-align: center; font-size: 16px;">Dear ${name},</p>
      <p style="text-align: center; font-size: 16px;">Thank you for registering with Wave pilot Systems.</p>
      <p style="text-align: center; font-size: 14px; color: #94a3b8;">You can now apply for jobs and track your applications.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.FRONTEND_URL}/dashboard" style="background: #0ea5e9; color: #0f172a; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: bold;">
          Go to Dashboard
        </a>
      </div>
      <p style="text-align: center; color: #64748b; font-size: 12px;">© ${new Date().getFullYear()} Wave pilot Systems</p>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: 'Welcome to Wave pilot!',
    html,
  });
};

export const sendStatusUpdateEmail = async (email, name, jobTitle, status) => {
  const statusColors = {
    Pending: '#f59e0b',
    Approved: '#34d399',
    Rejected: '#f87171',
  };

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0f172a; color: #f8fafc; border-radius: 16px;">
      <h1 style="color: #0ea5e9; text-align: center;">HYDROCEAN</h1>
      <h2 style="text-align: center;">Application Status Update</h2>
      <p style="text-align: center; font-size: 16px;">Dear ${name},</p>
      <p style="text-align: center; font-size: 16px;">Your application for <strong>${jobTitle}</strong> has been <strong style="color: ${statusColors[status]};">${status}</strong>.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.FRONTEND_URL}/dashboard" style="background: #0ea5e9; color: #0f172a; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: bold;">
          View Dashboard
        </a>
      </div>
      <p style="text-align: center; color: #64748b; font-size: 12px;">© ${new Date().getFullYear()} Wave pilot Systems</p>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: `Application ${status} - ${jobTitle}`,
    html,
  });
};

export const sendContactReplyEmail = async (email, name, subject, reply) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0f172a; color: #f8fafc; border-radius: 16px;">
      <h1 style="color: #0ea5e9; text-align: center;">HYDROCEAN</h1>
      <h2 style="text-align: center;">Reply to Your Inquiry</h2>
      <p style="text-align: center; font-size: 16px;">Dear ${name},</p>
      <p style="text-align: center; font-size: 16px;">Regarding your inquiry: <strong>${subject}</strong></p>
      <div style="background: #1e293b; padding: 16px; border-radius: 12px; margin: 20px 0;">
        <p style="text-align: center; font-size: 16px; color: #f8fafc;">${reply}</p>
      </div>
      <p style="text-align: center; color: #64748b; font-size: 12px;">© ${new Date().getFullYear()} Wave pilot Systems</p>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: `Reply: ${subject}`,
    html,
  });
};