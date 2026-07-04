import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import OTP from '../models/OTP.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';
import { generateOTP, sendOTP, saveOTP, verifyOTP } from '../services/otpService.js';
import { sendWelcomeEmail } from '../services/emailService.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// ============================================
// ✅ REGISTER - Direct Save (No OTP)
// ============================================

export const register = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // ✅ Validation
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return next(new AppError('All fields are required.', 400));
  }

  if (password !== confirmPassword) {
    return next(new AppError('Passwords do not match.', 400));
  }

  if (password.length < 6) {
    return next(new AppError('Password must be at least 6 characters.', 400));
  }

  // ✅ Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('User already exists with this email. Please login.', 400));
  }

  // ✅ Check if this email is a main admin email
  const isMainAdmin = process.env.MAIN_ADMIN_EMAIL_1 === email || 
                      process.env.MAIN_ADMIN_EMAIL_2 === email;

  // ✅ Create user directly (verified = true)
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role: isMainAdmin ? 'admin' : 'user',
    isVerified: true,
  });

  // ✅ Send welcome email (optional - don't wait for it)
  try {
    await sendWelcomeEmail(email, `${firstName} ${lastName}`);
  } catch (error) {
    console.log('⚠️ Welcome email failed but user registered:', error.message);
  }

  // ✅ Generate JWT token
  const token = signToken(user._id);

  res.status(201).json({
    success: true,
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    },
    message: 'Registration successful!',
  });
});

// ============================================
// ✅ LOGIN
// ============================================

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Email and password are required.', 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('Invalid email or password.', 401));
  }

  // ✅ Check if user is deleted
  if (user.isDeleted) {
    return res.status(401).json({
      success: false,
      message: 'Your account has been deleted. Please contact support to restore your account.',
      isDeleted: true,
    });
  }

  // ✅ Check if user is verified
  if (!user.isVerified) {
    // Send OTP for verification
    const otp = generateOTP();
    await saveOTP(email, otp, 'registration');
    await sendOTP(email, otp, 'registration');
    
    return res.status(401).json({
      success: false,
      needsVerification: true,
      email,
      message: 'Account not verified. A new OTP has been sent to your email.',
    });
  }

  // ✅ Check if user is blocked
  if (user.isBlocked) {
    return next(new AppError('Your account has been blocked. Please contact support.', 403));
  }

  // ✅ Verify password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return next(new AppError('Invalid email or password.', 401));
  }

  user.lastLogin = new Date();
  await user.save();

  const token = signToken(user._id);

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      isBlocked: user.isBlocked,
      isDeleted: user.isDeleted,
    },
  });
});

// ============================================
// ✅ GET CURRENT USER
// ============================================

export const getMe = catchAsync(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      role: req.user.role,
      isVerified: req.user.isVerified,
      isBlocked: req.user.isBlocked,
      isDeleted: req.user.isDeleted,
      profilePicture: req.user.profilePicture,
      permissions: req.user.permissions || [],
      phone: req.user.phone || '',
    },
  });
});

// ============================================
// ✅ FORGOT PASSWORD
// ============================================

export const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError('Email is required.', 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('No user found with this email.', 404));
  }

  const otp = generateOTP();
  await saveOTP(email, otp, 'forgot_password');
  await sendOTP(email, otp, 'forgot_password');

  res.status(200).json({
    success: true,
    message: 'OTP sent to your email for password reset.',
  });
});

// ============================================
// ✅ RESET PASSWORD
// ============================================

export const resetPassword = catchAsync(async (req, res, next) => {
  const { email, otp, newPassword, confirmPassword } = req.body;

  if (!email || !otp || !newPassword || !confirmPassword) {
    return next(new AppError('All fields are required.', 400));
  }

  if (newPassword !== confirmPassword) {
    return next(new AppError('Passwords do not match.', 400));
  }

  if (newPassword.length < 6) {
    return next(new AppError('Password must be at least 6 characters.', 400));
  }

  await verifyOTP(email, otp, 'forgot_password');

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('User not found.', 404));
  }

  user.password = newPassword;
  user.resetPasswordOTP = undefined;
  user.resetPasswordOTPExpiry = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password reset successfully. Please login with your new password.',
  });
});

// ============================================
// ✅ CHANGE PASSWORD
// ============================================

export const changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return next(new AppError('All fields are required.', 400));
  }

  if (newPassword !== confirmPassword) {
    return next(new AppError('Passwords do not match.', 400));
  }

  if (newPassword.length < 6) {
    return next(new AppError('Password must be at least 6 characters.', 400));
  }

  const user = await User.findById(req.user._id);
  const isPasswordValid = await user.comparePassword(currentPassword);

  if (!isPasswordValid) {
    return next(new AppError('Current password is incorrect.', 401));
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password changed successfully.',
  });
});

// ============================================
// ✅ VERIFY OTP (For existing users only)
// ============================================

export const verifyOTPController = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return next(new AppError('Email and OTP are required.', 400));
  }

  await verifyOTP(email, otp, 'registration');

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('User not found.', 404));
  }

  user.isVerified = true;
  await user.save();

  const token = signToken(user._id);

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    },
  });
});

// ============================================
// ✅ RESEND OTP (For existing users only)
// ============================================

export const resendOTP = catchAsync(async (req, res, next) => {
  const { email, purpose = 'registration' } = req.body;

  if (!email) {
    return next(new AppError('Email is required.', 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('User not found.', 404));
  }

  const otp = generateOTP();
  await saveOTP(email, otp, purpose);
  await sendOTP(email, otp, purpose);

  res.status(200).json({
    success: true,
    message: 'OTP sent successfully.',
  });
});