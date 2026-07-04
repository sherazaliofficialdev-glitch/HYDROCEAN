import express from 'express';
import {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyOTPController,
  resendOTP,
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// ✅ Register - Direct (No OTP Required)
router.post('/register', register);

// ✅ Login
router.post('/login', login);

// ✅ Verify OTP (For existing unverified users)
router.post('/verify-otp', verifyOTPController);

// ✅ Resend OTP (For existing unverified users)
router.post('/resend-otp', resendOTP);

// ✅ Forgot Password (OTP)
router.post('/forgot-password', forgotPassword);

// ✅ Reset Password (OTP)
router.post('/reset-password', resetPassword);

// ✅ Get Current User (Protected)
router.get('/me', protect, getMe);

// ✅ Change Password (Protected)
router.put('/change-password', protect, changePassword);

export default router;