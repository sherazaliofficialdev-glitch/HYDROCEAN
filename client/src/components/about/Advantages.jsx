import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Cpu, Zap, Globe, Award, CheckCircle } from 'lucide-react';

const Advantages = () => {
  const advantages = [
    {
      icon: Shield,
      title: 'Extreme Reliability',
      desc: 'All platforms undergo rigorous pressure, vibration, and aging tests.'
    },
    {
      icon: Cpu,
      title: 'AI-Powered Systems',
      desc: 'Smart navigation filters and real-time path planning for autonomous operations.'
    },
    {
      icon: Zap,
      title: 'Zero Carbon Footprint',
      desc: 'Solar-electric hybrid propulsion systems for sustainable marine exploration.'
    },
    {
      icon: Globe,
      title: 'Global Deployment',
      desc: 'Trusted by oceanography labs and marine security agencies worldwide.'
    },
    {
      icon: Award,
      title: 'Certified Quality',
      desc: 'ISO 9001, CE, and RoHS compliant marine systems.'
    },
    {
      icon: CheckCircle,
      title: 'Client Satisfaction',
      desc: 'Proven track record with offshore pipeline groups and research institutions.'
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary-500">
            Why Us
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-dark-200 mt-3 tracking-tight">
            Our Competitive Advantages
          </h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto mt-6 rounded-full" />
          <p className="text-lg text-slate-600 mt-4">
            What sets Wave pilot apart in the marine technology industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, index) => (
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
                <adv.icon className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-dark-200 text-lg mb-3">{adv.title}</h4>
              <p className="text-slate-600 leading-relaxed">{adv.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;