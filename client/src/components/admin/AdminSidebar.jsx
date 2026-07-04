import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, Users, Briefcase, FileText, Mail, 
  Search, Settings, LogOut, Menu, X, ChevronDown
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'contacts', label: 'Contacts', icon: Mail },
  ];

  const handleTabClick = (id) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* ✅ Mobile Hamburger Button - Top Right */}
      <div className="lg:hidden fixed top-20 right-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2.5 bg-primary-500 text-white rounded-xl shadow-lg hover:bg-primary-600 transition flex items-center gap-2"
        >
          {mobileOpen ? (
            <>
              <X className="h-5 w-5" />
              <span className="text-xs font-semibold">Close</span>
            </>
          ) : (
            <>
              <Menu className="h-5 w-5" />
              <span className="text-xs font-semibold">Menu</span>
            </>
          )}
        </button>
      </div>

      {/* ✅ Sidebar - Desktop */}
      <div className="hidden lg:flex h-full flex-col justify-between py-6 w-64 bg-white border-r border-slate-200 sticky top-20">
        <div>
          <div className="px-6 mb-8">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-primary-500">
              Admin Panel
            </h2>
            <p className="text-[10px] text-slate-400">Wave pilotManagement</p>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-semibold transition ${
                  activeTab === item.id
                    ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-500'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                <item.icon className="h-4.5 w-4.5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="border-t border-slate-200 pt-4">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-6 py-3 text-sm font-semibold text-rose-500 hover:bg-rose-50 transition"
          >
            <LogOut className="h-4.5 w-4.5" />
            Logout
          </button>
        </div>
      </div>

      {/* ✅ Mobile Sidebar - Top Slide Down Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            
            {/* Drawer - Top se slide down */}
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-16 left-0 right-0 z-50 bg-white shadow-2xl lg:hidden rounded-b-2xl max-h-[80vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="p-4 border-b border-slate-200 bg-slate-50 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-primary-500">
                      Admin Panel
                    </h2>
                    <p className="text-[10px] text-slate-400">Wave pilotManagement</p>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-1.5 hover:bg-slate-200 rounded-lg transition"
                  >
                    <X className="h-5 w-5 text-slate-500" />
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-3 space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition ${
                      activeTab === item.id
                        ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-500'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                    {activeTab === item.id && (
                      <span className="ml-auto text-[10px] text-primary-500 font-bold">Active</span>
                    )}
                  </button>
                ))}
              </nav>

              {/* Footer */}
              <div className="p-3 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-rose-500 hover:bg-rose-50 rounded-xl transition"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;