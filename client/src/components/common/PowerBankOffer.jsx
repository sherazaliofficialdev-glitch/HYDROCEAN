import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Battery, Zap, ShoppingBag, ArrowRight, Gift, Users, CheckCircle, Sparkles, CreditCard } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const PowerBankOffer = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    // Scroll to application form on jobs page
    const el = document.getElementById('application-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/jobs');
      setTimeout(() => {
        const el2 = document.getElementById('application-form-section');
        if (el2) el2.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  };

  // ✅ Power Bank Image URL
  const powerBankImage = '/images/power bank.jpeg';

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/80 via-slate-900/80 to-slate-800/80 border border-slate-700/50 shadow-2xl p-6 sm:p-10 lg:p-14"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

          <div className="relative z-10">
            {/* Top - How to Apply Button (Big) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-full mb-3">
                  <Gift className="h-4 w-4 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Limited Time Offer
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-teal-400 to-primary-400">
                    Power Bank
                  </span>
                  <span className="block text-white">Special Offer</span>
                </h2>
              </div>
              
              {/* Big "How to Apply" Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleApplyClick}
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary-500 via-teal-500 to-primary-500 bg-[length:200%_auto] hover:bg-[position:100%] text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl shadow-primary-500/30 transition-all duration-500 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-400 via-teal-400 to-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <span className="relative z-10 flex items-center gap-3">
                  <ShoppingBag className="h-6 w-6" />
                  How to Apply
                  <Sparkles className="h-5 w-5" />
                </span>
                <motion.span
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10"
                >
                  <ArrowRight className="h-6 w-6" />
                </motion.span>
              </motion.button>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left - Content */}
              <div className="space-y-6">
                {/* Description */}
                <div className="space-y-4 text-slate-300">
                  <p className="text-lg leading-relaxed">
                    <strong className="text-white">Wave Pilot</strong> is offering a chance to those applicants who 
                    shall become its customer by purchasing our mobile power bank.
                  </p>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2.5">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>All applicants shall be invited for <strong className="text-white">FREE Lunch</strong></span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Online test date shall be announced <strong className="text-white">physically and on website</strong></span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Candidates who pass the examination shall be <strong className="text-white">selected</strong></span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Power bank shall be delivered on your <strong className="text-white">address</strong></span>
                    </div>
                  </div>
                </div>

                {/* Price & Details */}
                <div className="flex flex-wrap items-center gap-6 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-amber-500/20 rounded-2xl border border-amber-500/30">
                      <Battery className="h-8 w-8 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Power Bank</p>
                      <p className="text-2xl font-bold text-white">10,000 mAh</p>
                    </div>
                  </div>
                  <div className="h-12 w-px bg-slate-700" />
                  <div>
                    <p className="text-sm text-slate-400">Deposit Amount</p>
                    <p className="text-2xl font-bold text-amber-400">Rs. 3,000/-</p>
                  </div>
                  <div className="h-12 w-px bg-slate-700" />
                  <div>
                    <p className="text-sm text-slate-400">Delivery</p>
                    <p className="text-lg font-bold text-white">Free Shipping</p>
                  </div>
                </div>

                {/* Small Apply Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleApplyClick}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500/20 hover:bg-primary-500/30 border border-primary-500/40 text-primary-300 font-semibold rounded-xl transition"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>

              {/* ✅ Right - Power Bank Image Card with Unsplash Image */}
              <div className="relative flex justify-center lg:justify-end">
                <motion.div
                  initial={{ scale: 0.9, rotateY: -10 }}
                  whileInView={{ scale: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                  className="relative"
                >
                  {/* Main Card */}
                  <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border border-slate-700 shadow-2xl overflow-hidden group">
                    {/* ✅ Unsplash Power Bank Image */}
                    <img
                      src={powerBankImage}
                      alt="Power Bank"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                    
                    {/* Floating Badges */}
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="absolute top-4 right-4 bg-amber-500 text-slate-950 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg rotate-12"
                    >
                      Offer
                    </motion.div>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="absolute bottom-4 left-4 bg-emerald-500 text-slate-950 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg -rotate-12"
                    >
                      Free Lunch
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      className="absolute top-1/2 -right-3 -translate-y-1/2 bg-primary-500/90 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg"
                    >
                      10,000 mAh
                    </motion.div>

                    {/* Bottom Info Overlay */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                      <p className="text-white font-bold text-sm">Wave Pilot Power Bank</p>
                      <p className="text-slate-300 text-xs">Limited Edition</p>
                    </div>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-primary-500/20 via-transparent to-transparent" />
                  </div>

                  {/* Outer Glow */}
                  <div className="absolute -inset-4 bg-primary-500/20 blur-2xl rounded-full -z-10" />
                </motion.div>
              </div>
            </div>

            {/* Bottom Note */}
            <div className="relative z-10 mt-8 pt-6 border-t border-white/10 text-center">
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-primary-400" />
                  <strong className="text-white">Account:</strong> PK84MEZN0095010105700533
                </span>
                <span className="hidden sm:inline text-slate-600">|</span>
                <span><strong className="text-white">Branch:</strong> KOT ADDU BRANCH</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PowerBankOffer;