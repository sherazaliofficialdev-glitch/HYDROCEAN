import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, Briefcase, Clock, CheckCircle, XCircle, 
  FileText, Bell, Settings, LogOut 
} from 'lucide-react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import BottomNav from '../common/BottomNav';
import LoadingSpinner from '../common/LoadingSpinner';
import ApplicationStats from './ApplicationStats';
import MyApplications from './MyApplications';
import NotificationsList from './NotificationsList';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import API from '../../utils/api';
import MetaTags from '../../seo/MetaTags';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const { showSuccess } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [appsRes, statsRes] = await Promise.all([
        API.get('/applications/my-applications'),
        API.get('/applications/stats'),
      ]);
      setApplications(appsRes.data.applications || []);
      setStats(statsRes.data.stats);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'applications', label: 'My Applications', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell },
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
      <MetaTags title="Dashboard - Hydrocean Marine" />
      <Header />
      <main className="pt-20 pb-24 lg:pb-0 min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-dark-200">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-slate-500 text-sm">
                Manage your applications and track their status
              </p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-sm font-semibold hover:bg-rose-100 transition"
            >
              <LogOut className="h-4.5 w-4.5" />
              Logout
            </button>
          </div>

          {/* Stats */}
          {stats && <ApplicationStats stats={stats} />}

          {/* Tabs */}
          <div className="flex gap-2 border-b border-slate-200 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <tab.icon className="h-4.5 w-4.5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Profile Summary */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-16 h-16 rounded-full bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-primary-500 text-2xl font-bold">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-200">
                      {user?.firstName} {user?.lastName}
                    </h3>
                    <p className="text-sm text-slate-500">{user?.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full text-xs font-medium">
                      {user?.role === 'admin' ? 'Administrator' : 'Applicant'}
                    </span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-primary-50 rounded-xl border border-primary-100">
                    <p className="text-2xl font-bold text-primary-600">{stats?.total || 0}</p>
                    <p className="text-xs text-slate-500">Total Applications</p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <p className="text-2xl font-bold text-amber-600">{stats?.pending || 0}</p>
                    <p className="text-xs text-slate-500">Pending</p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <p className="text-2xl font-bold text-emerald-600">{stats?.approved || 0}</p>
                    <p className="text-xs text-slate-500">Approved</p>
                  </div>
                  <div className="p-4 bg-rose-50 rounded-xl border border-rose-100">
                    <p className="text-2xl font-bold text-rose-600">{stats?.rejected || 0}</p>
                    <p className="text-xs text-slate-500">Rejected</p>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                  <Link
                    to="/jobs"
                    className="flex items-center justify-center gap-2 p-3 bg-primary-50 hover:bg-primary-100 text-primary-600 font-semibold rounded-xl transition"
                  >
                    <Briefcase className="h-5 w-5" />
                    Browse Jobs
                  </Link>
                  <button
                    onClick={() => setActiveTab('applications')}
                    className="flex items-center justify-center gap-2 p-3 bg-slate-50 hover:bg-slate-100 text-slate-600 font-semibold rounded-xl transition"
                  >
                    <FileText className="h-5 w-5" />
                    View Applications
                  </button>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className="flex items-center justify-center gap-2 p-3 bg-slate-50 hover:bg-slate-100 text-slate-600 font-semibold rounded-xl transition"
                  >
                    <Bell className="h-5 w-5" />
                    Notifications
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <MyApplications />
            )}

            {activeTab === 'notifications' && (
              <NotificationsList />
            )}
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
};

export default UserDashboard;