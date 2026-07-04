import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import API from '../utils/api';
import MetaTags from '../seo/MetaTags';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/auth/forgot-password', { email });
      showSuccess('OTP sent to your email. Please check your inbox.');
      navigate('/reset-password', { state: { email } });
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MetaTags title="Forgot Password - Wave pilot" />
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-20">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100"
          >
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-dark-200">Forgot Password</h1>
              <p className="text-slate-500 text-sm mt-1">
                Enter your email to receive an OTP for password reset
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Send OTP
                    <ArrowRight className="h-4.5 w-4.5" />
                  </>
                )}
              </button>
            </form>

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

export default ForgotPassword;