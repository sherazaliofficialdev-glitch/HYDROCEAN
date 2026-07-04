import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Menu, X, User, LogOut, Shield, Globe, Bell } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

console.log('✅ Header loaded'); // Debug log

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Jobs', path: '/jobs' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-dark-200/95 backdrop-blur-md border-b border-primary-500/20 shadow-2xl py-3'
        : 'bg-dark-200/80 backdrop-blur-md border-b border-slate-800/50 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-1.5 rounded-xl bg-dark-100 text-primary-400 border border-slate-800 transition-all shadow-md">
              <Compass className="h-7 w-7 transition-transform duration-700 group-hover:rotate-180" />
            </div>
            <div>
              <span className="font-sans font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-primary-400 transition-colors">
                Wave pilot
              </span>
              <p className="text-[8px] font-mono tracking-widest text-slate-500 uppercase leading-none mt-0.5">
                Marine Systems
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1 bg-dark-100/80 border border-slate-800/80 px-2.5 py-1 rounded-full">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all text-slate-300 hover:text-white hover:bg-dark-100">
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                {isAdmin && (
                  <Link to="/admin" className="px-3 py-1.5 bg-primary-500/10 border border-primary-500/20 text-primary-400 rounded-full text-[10px] font-bold uppercase hover:bg-primary-500/20 transition">
                    Admin
                  </Link>
                )}
                <Link to="/dashboard" className="px-3.5 py-1.5 bg-primary-500 text-dark-200 rounded-full text-xs font-bold uppercase hover:bg-primary-400 transition">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="p-1.5 text-slate-400 hover:text-rose-400 transition rounded-full">
                  <LogOut className="h-4.5 w-4.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="px-3.5 py-1.5 text-slate-300 hover:text-white text-xs font-bold uppercase transition">
                  Login
                </Link>
                <Link to="/register" className="px-3.5 py-1.5 bg-primary-500 text-dark-200 rounded-full text-xs font-bold uppercase hover:bg-primary-400 transition">
                  Register
                </Link>
              </div>
            )}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-1.5 text-slate-300 hover:text-white transition">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-dark-200/95 backdrop-blur-md border-b border-slate-800 px-4 py-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-300 hover:text-white transition px-3 py-2 rounded-lg hover:bg-dark-100">
                {link.name}
              </Link>
            ))}
            {!isAuthenticated && (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-primary-400 hover:text-primary-300 transition px-3 py-2 rounded-lg hover:bg-dark-100">
                  Login
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold bg-primary-500 text-dark-200 px-3 py-2 rounded-lg text-center hover:bg-primary-400 transition">
                  Register
                </Link>
              </>
            )}
            {isAuthenticated && (
              <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="text-sm font-semibold text-rose-400 hover:text-rose-300 transition px-3 py-2 rounded-lg hover:bg-dark-100 text-left">
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;