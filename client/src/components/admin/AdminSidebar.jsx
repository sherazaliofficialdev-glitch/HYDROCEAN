import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, Users, Briefcase, FileText, Mail, 
  Search, Settings, LogOut 
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const { logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'contacts', label: 'Contacts', icon: Mail },
  ];

  return (
    <div className="h-full flex flex-col justify-between py-6">
      <div>
        <div className="px-6 mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-primary-500">
            Admin Panel
          </h2>
          <p className="text-[10px] text-slate-400">Wave pilot Management</p>
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
};

// ✅ ADD THIS - Default export
export default AdminSidebar;