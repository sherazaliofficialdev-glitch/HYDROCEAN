import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-200 text-white border-t border-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <Compass className="h-8 w-8 text-primary-400" />
              <span className="font-display font-bold text-lg uppercase tracking-wider">Wave pilot</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Wave pilot Intelligent Tech specializes in advanced marine systems, high-magnetic brushless subsea motors, actuators, and unmanned exploration submersibles.
            </p>
            <p className="text-[10px] font-mono text-primary-400 font-bold tracking-widest uppercase">
              Pioneering Underwater Science
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-slate-200 uppercase tracking-widest text-[10px]">
              Site Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/" className="hover:text-primary-400 transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary-400 transition">About</Link></li>
              <li><Link to="/jobs" className="hover:text-primary-400 transition">Jobs</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display font-bold text-slate-200 uppercase tracking-widest text-[10px]">
              Contact Information
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary-400 shrink-0 mt-0.5" />
                Wave pilot Corporate HQ, Tech Sector 4, Islamabad, Pakistan
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary-400 shrink-0" />
                wavepilot1@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary-400 shrink-0" />
                +92 332 5924526
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary-400 shrink-0" />
                Mon - Fri (09:00 AM - 05:00 PM PST)
              </p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-slate-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-slate-500 gap-4">
          <p>© {currentYear} Wave pilot Marine Systems. All rights reserved.</p>
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            <span>SSL SECURED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;