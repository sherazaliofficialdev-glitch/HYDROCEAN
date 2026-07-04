import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Compass } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import MetaTags from '../seo/MetaTags';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      showError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      showError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const response = await register(formData);
      
      // ✅ Direct login after registration
      if (response.token && response.user) {
        localStorage.setItem('token', response.token);
        showSuccess(response.message || 'Registration successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      showError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Password Strength
  const getPasswordStrength = (pass) => {
    if (!pass) return { label: '', color: 'bg-transparent', pct: 0 };
    if (pass.length < 6) return { label: 'Too Short', color: 'bg-rose-500', pct: 20 };
    
    let score = 1;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score === 1) return { label: 'Weak', color: 'bg-rose-400', pct: 40 };
    if (score === 2) return { label: 'Fair', color: 'bg-amber-400', pct: 70 };
    return { label: 'Strong', color: 'bg-emerald-500', pct: 100 };
  };

  const strength = getPasswordStrength(formData.password);

  return (
    <>
      <MetaTags title="Register - " />
      <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 text-white relative overflow-hidden">
        
        {/* LEFT SIDE - Image & Branding */}
        <div className="hidden md:flex md:w-1/2 relative min-h-screen flex-col justify-between p-12 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=1920')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/80 to-slate-950/40" />
          
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl animate-pulse" />

          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3">
              <div className="p-2 bg-slate-950/90 border border-slate-800 rounded-2xl">
                <Compass className="h-8 w-8 text-primary-400" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white block">
                  HYDROCEAN
                </span>
                <p className="text-[9px] font-mono tracking-widest text-primary-400/80 uppercase">
                  Marine Systems
                </p>
              </div>
            </Link>
          </div>

          <div className="relative z-10 my-auto max-w-lg">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider bg-primary-500/10 text-primary-400 border border-primary-500/20">
                Join Us
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
                Create Your<br />Account Today
              </h1>
              <p className="text-slate-300 text-sm leading-relaxed max-w-md">
                Start your journey with  Systems. Apply for jobs, track applications, and build your career in marine technology.
              </p>
            </motion.div>
          </div>

          <div className="relative z-10 text-[10px] font-mono text-slate-500 border-t border-slate-800/50 pt-6">
            <span>© {new Date().getFullYear()}  Systems</span>
          </div>
        </div>

        {/* RIGHT SIDE - Register Form */}
        <div className="w-full md:w-1/2 min-h-screen flex flex-col justify-center p-6 sm:p-12 md:p-16 bg-slate-950">
          <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-all group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="w-full max-w-md mx-auto space-y-6 mt-12 md:mt-0">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-white">Create Account</h2>
              <p className="text-slate-400 text-sm mt-1">Join </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-500" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min 6 characters"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                  >
                    {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Password Strength</span>
                      <span className={strength.pct === 100 ? 'text-emerald-400' : strength.pct >= 70 ? 'text-amber-400' : 'text-rose-400'}>
                        {strength.label}
                      </span>
                    </div>
                    <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-500 ${strength.color}`} style={{ width: `${strength.pct}%` }} />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-500" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-3.5 rounded-xl text-slate-950 font-bold uppercase tracking-widest text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                style={{ backgroundColor: '#0ea5e9' }}
              >
                {loading ? (
                  <div className="h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </motion.button>
            </form>

            <p className="text-center text-xs text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-400 hover:text-primary-300 font-bold transition">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;