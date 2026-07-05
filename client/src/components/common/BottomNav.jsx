import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Info, Briefcase, Menu, X, User, LogOut, Shield, Globe, Compass } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const BottomNav = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'About', icon: Info, path: '/about' },
    { name: 'Jobs', icon: Briefcase, path: '/jobs' },
  ];

  const handleLogout = () => {
    logout();
    setDrawerOpen(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ✅ Bottom Navigation - Always Visible (No hide on scroll) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-dark-200/95 backdrop-blur-2xl border-t border-slate-800/80 px-2 py-2 flex justify-between items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex-1 min-w-[50px] max-w-[70px] flex flex-col items-center justify-center gap-0.5 transition-all ${
              isActive(item.path)
                ? 'text-primary-400 scale-110'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[9px] font-medium truncate">{item.name}</span>
            {isActive(item.path) && (
              <motion.span
                layoutId="bottomNavIndicator"
                className="absolute -top-0.5 w-6 h-0.5 rounded-full bg-primary-400"
              />
            )}
          </Link>
        ))}

        <button
          onClick={() => setDrawerOpen(true)}
          className="flex-1 min-w-[50px] max-w-[70px] flex flex-col items-center justify-center gap-0.5 text-slate-400 hover:text-slate-200 transition"
        >
          <Menu className="h-5 w-5" />
          <span className="text-[9px] font-medium">Menu</span>
        </button>
      </div>

      {/* ✅ Side Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-dark-300/70 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 bottom-0 z-[70] w-[300px] max-w-[85vw] bg-dark-200 border-l border-slate-800/60 p-6 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/60">
                <div className="flex items-center gap-2">
                  <Compass className="h-6 w-6 text-primary-400" />
                  <span className="font-extrabold text-sm text-white">Wave Pilot</span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1.5 bg-dark-100 rounded-lg text-slate-400 hover:text-white transition"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* User Profile */}
              {isAuthenticated && user && (
                <div className="mt-4 p-3 bg-dark-100/60 border border-slate-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-primary-400 font-bold text-sm">
                      {user.firstName?.[0]}{user.lastName?.[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <div className="mt-6 space-y-1 flex-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                      isActive(item.path)
                        ? 'bg-primary-500/10 text-primary-400'
                        : 'text-slate-300 hover:bg-dark-100 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-4.5 w-4.5" />
                    {item.name}
                  </Link>
                ))}

                {isAuthenticated && (
                  <Link
                    to="/dashboard"
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                      location.pathname === '/dashboard'
                        ? 'bg-primary-500/10 text-primary-400'
                        : 'text-slate-300 hover:bg-dark-100 hover:text-white'
                    }`}
                  >
                    <User className="h-4.5 w-4.5" />
                    Dashboard
                  </Link>
                )}

                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                      location.pathname === '/admin'
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'text-amber-400/70 hover:bg-dark-100 hover:text-amber-400'
                    }`}
                  >
                    <Shield className="h-4.5 w-4.5" />
                    Admin Panel
                  </Link>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="border-t border-slate-800/60 pt-4 space-y-2">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-950/30 transition"
                  >
                    <LogOut className="h-4.5 w-4.5" />
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setDrawerOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-primary-400 hover:bg-primary-500/10 transition"
                    >
                      <User className="h-4.5 w-4.5" />
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setDrawerOpen(false)}
                      className="w-full flex items-center justify-center px-3 py-2.5 rounded-xl text-sm font-bold bg-primary-500 text-dark-200 hover:bg-primary-400 transition"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default BottomNav;