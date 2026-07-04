import React from 'react';
import { motion } from 'framer-motion';
import { Building2, FileText, Shield, ExternalLink, Award, Landmark, Download } from 'lucide-react';

const TrustSection = () => {
  // PDF link - PDF file ko public/pdfs/ folder mein rakhein
  const certificatePdfUrl = '/pdfs/registration-certificate.pdf';

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
                Company Registration
              </span>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-200 tracking-tight leading-[1.1] mt-3">
                Verified & Trusted
              </h2>

              <div className="w-16 h-1 bg-primary-500 mt-6 rounded-full" />

              <p className="text-xl sm:text-2xl font-bold text-dark-200/90 mt-6 leading-snug">
                Wave pilot is officially incorporated and registered under the Companies Act as a technology provider for marine and autonomous subsea exploration systems.
              </p>

              {/* Registration Details */}
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="p-2 bg-primary-50 rounded-lg text-primary-500">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Representative</p>
                    <p className="font-bold text-dark-200">HAMZA ARIF</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="p-2 bg-primary-50 rounded-lg text-primary-500">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Registration Number</p>
                    <p className="font-bold text-dark-200 font-mono">95010105700533</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="p-2 bg-primary-50 rounded-lg text-primary-500">
                    <Landmark className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">IBAN</p>
                    <p className="font-bold text-dark-200 font-mono text-sm">PK84MEZN0095010105700533</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="p-2 bg-primary-50 rounded-lg text-primary-500">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Branch</p>
                    <p className="font-bold text-dark-200">KOT ADDU BRANCH</p>
                  </div>
                </div>
              </div>

              {/* View Registration Certificate Button - PDF Link */}
              <motion.a
                href={certificatePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 mt-8 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-bold text-base rounded-xl transition shadow-lg hover:shadow-primary-500/30"
              >
                <Shield className="h-5 w-5" />
                View Registration Certificate
                <ExternalLink className="h-4 w-4" />
              </motion.a>
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
              src="/images/images (15).jpg"
              alt="Company Registration Certificate"
              className="w-full h-full  hover:scale-105 transition-transform duration-700"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute bottom-8 right-8 bg-dark-200/90 backdrop-blur-md text-white rounded-2xl p-6 shadow-xl border border-slate-800"
            >
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-primary-400" />
                <div>
                  <span className="text-sm font-bold text-primary-400 block">Verified</span>
                  <span className="text-[10px] text-slate-400">Official Registration</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;