import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import BottomNav from '../components/common/BottomNav';
import ApplicationForm from '../components/apply/ApplicationForm';
import MetaTags from '../seo/MetaTags';

const ApplyJob = () => {
  const location = useLocation();
  const jobId = location.state?.jobId || '';
  const jobTitle = location.state?.jobTitle || '';

  return (
    <>
      <MetaTags title={`Apply for ${jobTitle || 'Job'} - Wave pilot`} />
      <Header />
      <main className="pt-20 pb-24 lg:pb-0 min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-dark-200">Apply for Position</h1>
            <p className="text-slate-500 mt-2">Complete the form below to submit your application</p>
          </div>
          <ApplicationForm jobId={jobId} jobTitle={jobTitle} />
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
};

export default ApplyJob;