import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Briefcase, ClipboardList, 
  MessageSquare, LogOut, Menu, X, Settings, ChevronDown
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'applications', label: 'Applications', icon: ClipboardList },
    { id: 'contacts', label: 'Messages', icon: MessageSquare },
  ];

  const handleTabClick = (id) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  // ✅ Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="hidden lg:flex h-full flex-col justify-between py-6 w-64 bg-white border-r border-slate-200 sticky top-20 min-h-[calc(100vh-5rem)]">
      <div>
        <div className="px-6 mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-primary-500">
            Admin Panel
          </h2>
          <p className="text-[10px] text-slate-400">Wave Pilot Management</p>
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
  );

  // ✅ Mobile - Horizontal Top Navigation
  const MobileTopNav = () => (
    <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between px-3 py-2">
        {/* ✅ Brand */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 hover:bg-slate-100 rounded-lg transition"
          >
            {mobileOpen ? <X className="h-5 w-5 text-slate-600" /> : <Menu className="h-5 w-5 text-slate-600" />}
          </button>
          <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">Admin</span>
        </div>

        {/* ✅ Active Tab Label */}
        <span className="text-sm font-medium text-dark-200 truncate max-w-[120px]">
          {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
        </span>

        {/* ✅ Logout */}
        <button
          onClick={logout}
          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
        >
          <LogOut className="h-4.5 w-4.5" />
        </button>
      </div>

      {/* ✅ Mobile Dropdown Menu - Slide Down */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-white border-t border-slate-100 shadow-lg rounded-b-2xl overflow-hidden"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 p-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl transition ${
                    activeTab === item.id
                      ? 'bg-primary-50 text-primary-600 border border-primary-100'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                  {activeTab === item.id && (
                    <span className="w-6 h-0.5 rounded-full bg-primary-500" />
                  )}
                </button>
              ))}
            </div>

            {/* ✅ Logout in dropdown */}
            <div className="border-t border-slate-100 p-2">
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition text-sm font-medium"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <MobileTopNav />
      <DesktopSidebar />
      {/* ✅ Mobile Spacer - So content doesn't hide under nav */}
      <div className="lg:hidden h-14" />
    </>
  );
};

export default AdminSidebar;