import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Target, Eye, Shield } from 'lucide-react';

const CompanyIntro = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-full mx-auto px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left - Full Width Image (No Padding) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden h-full min-h-[500px]"
          >
            <img
              src="/images/images1.png"
              alt="Wave pilot Marine Research"
              className="w-full h-[800px] hover:scale-105 transition-transform duration-700"
            />
            {/* Floating Badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute bottom-8 left-8 bg-dark-200/90 backdrop-blur-md text-white rounded-2xl p-6 shadow-xl border border-slate-800"
            >
              <span className="text-4xl font-extrabold text-primary-400 block">15+</span>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Years Experience</span>
            </motion.div>
          </motion.div>

          {/* Right - Bold Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center px-8 sm:px-12 lg:px-16 py-12 lg:py-0 bg-white"
          >
            <div className="max-w-xl">
              {/* Small Tag */}
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary-500">
                About Wave pilot
              </span>

              {/* Bold Heading - Large */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-200 tracking-tight leading-[1.1] mt-3">
                Pioneering Marine Science & Subsea Robotics
              </h2>

              <div className="w-16 h-1 bg-primary-500 mt-6 rounded-full" />

              {/* Bold Description */}
              <p className="text-xl sm:text-2xl font-bold text-dark-200/90 mt-6 leading-snug">
                Wave pilot is an international leader in the engineering, design, and manufacturing of high-magnetic density subsea electric actuators, brushless thrusters, and autonomous surface-to-deep-sea vehicles.
              </p>

              {/* Medium Description */}
              <p className="text-base text-slate-600 mt-4 leading-relaxed">
                By bridging high-fidelity physics with cognitive edge computing, our USV and AUV fleets operate in extreme deep sea climates up to 8000m, gathering precise oceanographic data.
              </p>

              {/* Feature Icons */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-50 rounded-lg text-primary-500">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-dark-200 text-sm">Our Mission</h4>
                    <p className="text-xs text-slate-500">Carbon-neutral oceanic tech</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-50 rounded-lg text-primary-500">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-dark-200 text-sm">Our Vision</h4>
                    <p className="text-xs text-slate-500">Digital ocean floor</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-50 rounded-lg text-primary-500">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-dark-200 text-sm">Quality Assurance</h4>
                    <p className="text-xs text-slate-500">ISO 9001 certified</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-50 rounded-lg text-primary-500">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-dark-200 text-sm">Global Reach</h4>
                    <p className="text-xs text-slate-500">20+ countries</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompanyIntro;