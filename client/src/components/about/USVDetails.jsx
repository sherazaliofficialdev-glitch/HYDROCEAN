import React from 'react';
import { motion } from 'framer-motion';
import { Navigation, Camera, Radio, Cpu, Battery, Compass, CheckCircle } from 'lucide-react';

const USVDetails = () => {
  const features = [
    { icon: Navigation, text: 'Multi-frequency GPS with RTK precision' },
    { icon: Camera, text: 'HD & thermal imaging cameras' },
    { icon: Radio, text: 'Satellite & RF communication' },
    { icon: Cpu, text: 'AI-powered navigation core' },
    { icon: Battery, text: 'Smart lithium power management' },
    { icon: Compass, text: 'Autonomous waypoint navigation' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-full mx-auto px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left - Full Width Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden h-full min-h-[500px] order-1"
          >
            <img
              src="/images/images.png"
              alt="USV Technology"
              className="w-full h-full  hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

          {/* Right - Bold Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center px-8 sm:px-12 lg:px-16 py-12 lg:py-0 bg-white order-2"
          >
            <div className="max-w-xl">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary-500">
                USV Technology
              </span>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-200 tracking-tight leading-[1.1] mt-3">
                Unmanned Surface Vehicles
              </h2>

              <div className="w-16 h-1 bg-primary-500 mt-6 rounded-full" />

              <p className="text-xl sm:text-2xl font-bold text-dark-200/90 mt-6 leading-snug">
                Our USVs are designed for perpetual marine data collection. Utilizing wave movement for propulsion and high-capacity solar arrays, they map maritime variables with absolute zero carbon output.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100"
                  >
                    <CheckCircle className="h-4 w-4 text-primary-500 shrink-0" />
                    <span className="text-sm text-slate-600">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default USVDetails;