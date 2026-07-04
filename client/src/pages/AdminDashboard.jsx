import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Briefcase, FileText, Mail, TrendingUp, 
  Clock, CheckCircle, XCircle, UserPlus, Calendar
} from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import BottomNav from '../components/common/BottomNav';
import AdminSidebar from '../components/admin/AdminSidebar';
import UsersManagement from '../components/admin/UsersManagement';
import JobsManagement from '../components/admin/JobsManagement';
import ApplicationsManagement from '../components/admin/ApplicationsManagement';
import ContactsManagement from '../components/admin/ContactsManagement';
import GlobalSearch from '../components/admin/GlobalSearch';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import API from '../utils/api';
import MetaTags from '../seo/MetaTags';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await API.get('/admin/stats');
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'contacts', label: 'Contacts', icon: Mail },
  ];

  if (loading) {
    return (
      <>
        <Header />
        <LoadingSpinner fullScreen />
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <MetaTags title="Admin Dashboard - Wave pilot" />
      <Header />
      <main className="pt-20 pb-24 lg:pb-0 min-h-screen bg-slate-50">
        <div className="flex">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-64 min-h-screen bg-white border-r border-slate-200 sticky top-20">
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-dark-200">
                    Admin Dashboard
                  </h1>
                  <p className="text-slate-500 text-sm">
                    Welcome back, {user?.firstName}! Here's what's happening.
                  </p>
                </div>
                <GlobalSearch />
              </div>

              {/* Stats Cards */}
              {activeTab === 'dashboard' && stats && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                  <StatCard 
                    icon={Users} 
                    label="Total Users" 
                    value={stats.totalUsers}
                    color="blue"
                  />
                  <StatCard 
                    icon={UserPlus} 
                    label="Today's Users" 
                    value={stats.usersToday}
                    color="green"
                  />
                  <StatCard 
                    icon={Briefcase} 
                    label="Total Jobs" 
                    value={stats.totalJobs}
                    color="purple"
                  />
                  <StatCard 
                    icon={FileText} 
                    label="Applications" 
                    value={stats.totalApplications}
                    color="orange"
                  />
                  <StatCard 
                    icon={Clock} 
                    label="Pending" 
                    value={stats.pendingApplications}
                    color="amber"
                  />
                  <StatCard 
                    icon={CheckCircle} 
                    label="Approved" 
                    value={stats.approvedApplications}
                    color="emerald"
                  />
                  <StatCard 
                    icon={XCircle} 
                    label="Rejected" 
                    value={stats.rejectedApplications}
                    color="rose"
                  />
                  <StatCard 
                    icon={Mail} 
                    label="Messages" 
                    value={stats.totalContacts}
                    color="indigo"
                  />
                  <StatCard 
                    icon={Calendar} 
                    label="Visitors Today" 
                    value={stats.visitorsToday}
                    color="teal"
                  />
                  <StatCard 
                    icon={TrendingUp} 
                    label="This Week" 
                    value={stats.visitorsThisWeek}
                    color="cyan"
                  />
                </div>
              )}

              {/* Tab Content */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                {activeTab === 'dashboard' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-bold text-dark-200">Recent Activity</h2>
                    {stats?.recentActivities?.length > 0 ? (
                      <div className="space-y-3">
                        {stats.recentActivities.map((activity, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                            <div className="w-2 h-2 rounded-full bg-primary-500 mt-2" />
                            <div>
                              <p className="text-sm font-semibold text-dark-200">{activity.action}</p>
                              <p className="text-xs text-slate-500">{activity.description}</p>
                              <p className="text-[10px] text-slate-400 mt-1">
                                {new Date(activity.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">No recent activity.</p>
                    )}
                  </div>
                )}

                {activeTab === 'users' && <UsersManagement />}
                {activeTab === 'jobs' && <JobsManagement />}
                {activeTab === 'applications' && <ApplicationsManagement />}
                {activeTab === 'contacts' && <ContactsManagement />}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
};

const StatCard = ({ icon: Icon, label, value, color }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    green: 'bg-green-50 text-green-600 border-green-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
    orange: 'bg-orange-50 text-orange-600 border-orange-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    rose: 'bg-rose-50 text-rose-600 border-rose-100',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    teal: 'bg-teal-50 text-teal-600 border-teal-100',
    cyan: 'bg-cyan-50 text-cyan-600 border-cyan-100',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-xl border ${colors[color]}`}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4.5 w-4.5" />
        <span className="text-xs font-medium text-slate-500">{label}</span>
      </div>
      <p className="text-2xl font-bold mt-1">{value || 0}</p>
    </motion.div>
  );
};

export default AdminDashboard;