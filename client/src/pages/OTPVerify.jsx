import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, RefreshCw, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import API from '../utils/api';
import MetaTags from '../seo/MetaTags';

const OTPVerify = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const { verifyOTP } = useAuth();
  const { showSuccess, showError } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const email = location.state?.email || '';

  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // ✅ Fix: Handle paste for all inputs
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    if (!pastedData) return;
    
    // Remove non-digit characters
    const digits = pastedData.replace(/\D/g, '');
    
    if (digits.length === 0) return;
    
    // Fill the OTP inputs with the pasted digits
    const newOtp = [...otp];
    for (let i = 0; i < Math.min(digits.length, 6); i++) {
      newOtp[i] = digits[i];
    }
    setOtp(newOtp);
    
    // Focus the next empty input or the last input
    const nextIndex = Math.min(digits.length, 5);
    if (inputRefs.current[nextIndex]) {
      inputRefs.current[nextIndex].focus();
    }
  };

  const handleChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      showError('Please enter all 6 digits.');
      return;
    }

    setLoading(true);
    try {
      await verifyOTP(email, otpValue);
      showSuccess('Email verified successfully!');
      navigate('/dashboard');
    } catch (error) {
      showError(error.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    
    setResendLoading(true);
    try {
      await API.post('/auth/resend-otp', { email, purpose: 'registration' });
      showSuccess('New OTP sent to your email.');
      setCountdown(60);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to resend OTP.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <>
      <MetaTags title="Verify Email - Wave pilot" />
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-20">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary-500" />
              </div>
              <h1 className="text-2xl font-bold text-dark-200">Verify Your Email</h1>
              <p className="text-slate-500 text-sm mt-1">
                Enter the 6-digit OTP sent to{' '}
                <span className="font-semibold text-dark-200">{email}</span>
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div 
                className="flex justify-center gap-2 mb-6"
                onPaste={handlePaste}
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 text-center text-2xl font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition disabled:opacity-50"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                ) : (
                  'Verify Email'
                )}
              </button>
            </form>

            <div className="text-center mt-6">
              <button
                onClick={handleResend}
                disabled={countdown > 0 || resendLoading}
                className="text-sm text-slate-500 hover:text-primary-500 transition flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
              >
                {resendLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
              </button>
            </div>

            <button
              onClick={() => navigate('/login')}
              className="mt-4 text-sm text-slate-400 hover:text-slate-600 transition flex items-center justify-center gap-1 mx-auto"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default OTPVerify;