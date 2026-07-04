import React from 'react';
import { motion } from 'framer-motion';
import { Users, Cpu, Shield, Target, Award, CheckCircle } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Users,
      title: 'Experienced R&D Team',
      desc: 'Our facility houses over 60 dedicated marine research PhDs and subsea robotics experts.'
    },
    {
      icon: Cpu,
      title: 'Advanced Technology',
      desc: 'Integrating state-of-the-art FOC motor vectors, digital twins, and autonomous control layers.'
    },
    {
      icon: Shield,
      title: 'Extreme Reliability',
      desc: 'Every platform undergoes rigorous pressure, vibration, electromagnetic, and aging tests.'
    },
    {
      icon: Target,
      title: 'AI-Based Navigation',
      desc: 'Smart machine vision filters and real-time path planning facilitate completely crew-free operations.'
    },
    {
      icon: Award,
      title: 'Global Standards',
      desc: 'Fully certified marine systems compliant with ISO 9001, CE safety, and environmental RoHS.'
    },
    {
      icon: CheckCircle,
      title: 'Client Satisfaction',
      desc: 'Trusted by international oceanography labs, marine security agencies, and offshore pipeline groups.'
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Center Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary-500">
            Why Wave pilot
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-dark-200 mt-3 tracking-tight">
            Why Leading Research Labs Trust Wave pilot
          </h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto mt-6 rounded-full" />
          <p className="text-lg text-slate-600 mt-4">
            Trusted by oceanography labs, marine security agencies, and offshore pipeline groups worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="p-3 bg-primary-50 rounded-xl inline-block text-primary-500 mb-4">
                <reason.icon className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-dark-200 text-lg mb-3">{reason.title}</h4>
              <p className="text-slate-600 leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;