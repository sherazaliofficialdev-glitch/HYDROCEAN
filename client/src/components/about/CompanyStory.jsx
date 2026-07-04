import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Award, Users, Globe } from 'lucide-react';

const CompanyStory = () => {
  const stats = [
    { icon: Clock, value: '15+', label: 'Years Experience' },
    { icon: Award, value: '50+', label: 'Global Projects' },
    { icon: Users, value: '60+', label: 'Expert Team Members' },
    { icon: Globe, value: '20+', label: 'Countries Served' }
  ];

  return (
    <section className="py-20 bg-white pt-32">
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
              src="/images/image1.png"
              alt="Wave pilot Story"
              className="w-full h-[750px]  hover:scale-105 transition-transform duration-700"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute bottom-8 left-8 bg-dark-200/90 backdrop-blur-md text-white rounded-2xl p-6 shadow-xl border border-slate-800"
            >
              <p className="text-sm font-mono text-primary-400 font-bold">Est. 2010</p>
              <p className="text-[10px] text-slate-400">Pioneering Marine Tech</p>
            </motion.div>
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
                Our Story
              </span>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-200 tracking-tight leading-[1.1] mt-3">
                From Lab to Global Leader
              </h2>

              <div className="w-16 h-1 bg-primary-500 mt-6 rounded-full" />

              <p className="text-xl sm:text-2xl font-bold text-dark-200/90 mt-6 leading-snug">
                Wave pilot started as a small subsea motor lab in Islamabad, Pakistan, with a vision to revolutionize underwater exploration technology.
              </p>

              <p className="text-base text-slate-600 mt-4 leading-relaxed">
                Today, we are a premier global supplier of oceanographic exploration robotics and autonomous marine systems. From our ISO 9001 certified facilities to our global deployment network, we continue to lead the industry forward.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-center"
                  >
                    <stat.icon className="h-5 w-5 text-primary-500 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-dark-200">{stat.value}</p>
                    <p className="text-xs text-slate-500">{stat.label}</p>
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

export default CompanyStory;