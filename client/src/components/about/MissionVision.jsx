import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Rocket, Sparkles } from 'lucide-react';

const MissionVision = () => {
  const items = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To deliver carbon-neutral high-end oceanic autonomous technologies globally, empowering scientific research and industrial innovation.',
      color: 'primary'
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'To enable seamless global digitalization of the world\'s ocean floor through advanced robotic networks and autonomous systems.',
      color: 'secondary'
    },
    {
      icon: Rocket,
      title: 'Our Goal',
      description: 'To become the world\'s leading provider of subsea robotics, autonomous vehicles, and marine actuator solutions.',
      color: 'accent'
    },
    {
      icon: Sparkles,
      title: 'Our Values',
      description: 'Innovation, quality, sustainability, and collaboration drive everything we do at Wave pilot.',
      color: 'primary'
    }
  ];

  const colorClasses = {
    primary: 'bg-primary-50 text-primary-500 border-primary-100',
    secondary: 'bg-indigo-50 text-indigo-500 border-indigo-100',
    accent: 'bg-emerald-50 text-emerald-500 border-emerald-100'
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-full mx-auto px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left - Bold Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center px-8 sm:px-12 lg:px-16 py-12 lg:py-0 bg-slate-50 order-1 lg:order-1"
          >
            <div className="max-w-xl">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary-500">
                Our Purpose
              </span>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-200 tracking-tight leading-[1.1] mt-3">
                Mission, Vision & Values
              </h2>

              <div className="w-16 h-1 bg-primary-500 mt-6 rounded-full" />

              <p className="text-xl sm:text-2xl font-bold text-dark-200/90 mt-6 leading-snug">
                Guided by our core principles, we are committed to advancing marine technology for a sustainable future.
              </p>

              <div className="space-y-4 mt-6">
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border ${colorClasses[item.color]} bg-opacity-10 flex items-start gap-4`}
                  >
                    <div className={`p-2 rounded-lg ${colorClasses[item.color]} shrink-0`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-dark-200 text-lg">{item.title}</h3>
                      <p className="text-sm text-slate-600">{item.description}</p>
                    </div>
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
              src="/images/images (3).jpeg"
              alt="Mission Vision"
              className="w-full h-[850px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;