import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle, FileText } from 'lucide-react';

const ApplicationStats = ({ stats }) => {
  const items = [
    { label: 'Total', value: stats?.total || 0, icon: FileText, color: 'primary' },
    { label: 'Pending', value: stats?.pending || 0, icon: Clock, color: 'amber' },
    { label: 'Approved', value: stats?.approved || 0, icon: CheckCircle, color: 'emerald' },
    { label: 'Rejected', value: stats?.rejected || 0, icon: XCircle, color: 'rose' },
  ];

  const colors = {
    primary: 'bg-primary-50 text-primary-600 border-primary-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    rose: 'bg-rose-50 text-rose-600 border-rose-100',
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`p-3 rounded-xl border ${colors[item.color]} shadow-sm`}
        >
          <div className="flex items-center gap-2">
            <item.icon className="h-4 w-4" />
            <span className="text-xs font-medium">{item.label}</span>
          </div>
          <p className="text-xl font-bold mt-1">{item.value}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default ApplicationStats;