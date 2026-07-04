import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Waves, Camera, Cpu, Battery, Radio, CheckCircle } from 'lucide-react';

const AUVSection = () => {
  const features = [
    { icon: Shield, text: 'Titanium pressure hull for 6000m depth' },
    { icon: Waves, text: 'Multibeam sonar for 3D mapping' },
    { icon: Camera, text: 'Starlight subsea imaging system' },
    { icon: Cpu, text: 'AI-powered autonomous navigation' },
    { icon: Battery, text: 'Oil-filled pressure-balanced cells' },
    { icon: Radio, text: 'Acoustic telemetry & data transfer' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-full mx-auto px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left - Bold Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center px-8 sm:px-12 lg:px-16 py-12 lg:py-0 bg-white order-1 lg:order-1"
          >
            <div className="max-w-xl">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary-500">
                Autonomous Underwater Vehicles
              </span>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-200 tracking-tight leading-[1.1] mt-3">
                Deep-Sea Subsea Robotics
              </h2>

              <div className="w-16 h-1 bg-primary-500 mt-6 rounded-full" />

              <p className="text-xl sm:text-2xl font-bold text-dark-200/90 mt-6 leading-snug">
                An AUV is a completely self-piloted robotic submarine designed to navigate underwater without tether cables or real-time human intervention.
              </p>

              <p className="text-base text-slate-600 mt-4 leading-relaxed">
                Following sophisticated pre-programmed flight paths, AUVs map extreme depths, inspect subsea infrastructure pipelines, and log acoustic imagery of the oceanic crust.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
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

          {/* Right - Full Width Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden h-full min-h-[500px] order-2 lg:order-2"
          >
            <img
              src="/images/image (10).jpeg"
              alt="Autonomous Underwater Vehicle"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute bottom-8 right-8 bg-dark-200/90 backdrop-blur-md text-white rounded-2xl p-6 shadow-xl border border-slate-800"
            >
              <span className="text-4xl font-extrabold text-primary-400 block">8000m</span>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Depth Rating</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AUVSection;