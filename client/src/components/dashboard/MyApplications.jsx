import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, XCircle, Eye, FileText, AlertCircle } from 'lucide-react';
import API from '../../utils/api';
import { useToast } from '../../hooks/useToast';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
  const { showError } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await API.get('/applications/my-applications');
      setApplications(response.data.applications || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      showError(error.response?.data?.message || 'Failed to load applications.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      Pending: { icon: Clock, color: 'bg-amber-50 text-amber-600 border-amber-200', label: 'Pending Review' },
      Approved: { icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600 border-emerald-200', label: 'Approved ✅' },
      Rejected: { icon: XCircle, color: 'bg-rose-50 text-rose-600 border-rose-200', label: 'Rejected ❌' },
    };

    const defaultStatus = statusMap[status] || statusMap.Pending;
    const Icon = defaultStatus.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${defaultStatus.color}`}>
        <Icon className="h-3.5 w-3.5" />
        {defaultStatus.label}
      </span>
    );
  };

  const getFilteredApplications = () => {
    if (filter === 'all') return applications;
    return applications.filter(app => app.status === filter);
  };

  const getCounts = () => {
    const total = applications.length;
    const pending = applications.filter(a => a.status === 'Pending').length;
    const approved = applications.filter(a => a.status === 'Approved').length;
    const rejected = applications.filter(a => a.status === 'Rejected').length;
    return { total, pending, approved, rejected };
  };

  const counts = getCounts();
  const filteredApps = getFilteredApplications();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 border-3 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* ✅ Status Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200 pb-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            filter === 'all' 
              ? 'bg-primary-500 text-white' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All ({counts.total})
        </button>
        <button
          onClick={() => setFilter('Pending')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            filter === 'Pending' 
              ? 'bg-amber-500 text-white' 
              : 'bg-amber-50 text-amber-600 hover:bg-amber-100'
          }`}
        >
          Pending ({counts.pending})
        </button>
        <button
          onClick={() => setFilter('Approved')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            filter === 'Approved' 
              ? 'bg-emerald-500 text-white' 
              : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
          }`}
        >
          Approved ({counts.approved})
        </button>
        <button
          onClick={() => setFilter('Rejected')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            filter === 'Rejected' 
              ? 'bg-rose-500 text-white' 
              : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
          }`}
        >
          Rejected ({counts.rejected})
        </button>
      </div>

      {filteredApps.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-dark-200">
            {filter === 'all' ? 'No Applications' : `No ${filter} Applications`}
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            {filter === 'all' 
              ? "You haven't applied for any jobs yet." 
              : `You don't have any ${filter.toLowerCase()} applications.`}
          </p>
          {filter === 'all' && (
            <Link
              to="/jobs"
              className="inline-block mt-4 px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition text-sm"
            >
              Browse Jobs
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApps.map((app) => (
            <div key={app.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div>
                <h4 className="font-bold text-dark-200 text-lg">{app.jobTitle}</h4>
                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <span className="text-xs text-slate-500">Applied: {new Date(app.createdAt).toLocaleDateString()}</span>
                  <span className="text-xs text-slate-500 font-mono">ID: {app.trackingId}</span>
                </div>
                {app.rejectionReason && app.status === 'Rejected' && (
                  <div className="mt-2 flex items-start gap-2 text-xs text-rose-600 bg-rose-50 p-2 rounded-lg">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>Reason: {app.rejectionReason}</span>
                  </div>
                )}
                {app.adminNotes && (
                  <div className="mt-2 text-xs text-slate-500 bg-slate-50 p-2 rounded-lg">
                    <span className="font-medium">Admin Note:</span> {app.adminNotes}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 mt-3 sm:mt-0">
                {getStatusBadge(app.status)}
                <Link
                  to={`/applications/${app.id}`}
                  className="p-2 text-slate-400 hover:text-primary-500 rounded-lg hover:bg-slate-100 transition"
                  title="View Details"
                >
                  <Eye className="h-4.5 w-4.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;