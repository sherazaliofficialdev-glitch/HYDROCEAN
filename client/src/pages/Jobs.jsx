import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import BottomNav from '../components/common/BottomNav';
import JobList from '../components/jobs/JobList';
import JobFilters from '../components/jobs/JobFilters';
import ApplicationForm from '../components/apply/ApplicationForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import API from '../utils/api';
import MetaTags from '../seo/MetaTags';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    status: 'open',
  });
  const { isAuthenticated } = useAuth();
  const { showError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  useEffect(() => {
    const pendingJobId = sessionStorage.getItem('pendingJobId');
    const stateJobId = location.state?.selectedJobId;
    
    const jobId = stateJobId || pendingJobId;
    
    if (jobId) {
      setSelectedJobId(jobId);
      sessionStorage.removeItem('pendingJobId');
      setTimeout(() => {
        document.getElementById('application-form-section')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 500);
    }
  }, [location.state]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters);
      const response = await API.get(`/jobs?${params}`);
      
      // ✅ Debug - Check if jobs have _id
      console.log('📋 Jobs API Response:', response.data);
      
      const jobsData = response.data.jobs || [];
      if (jobsData.length > 0) {
        console.log('📋 First job:', jobsData[0]);
        console.log('📋 Job ID field:', jobsData[0].id || jobsData[0]._id);
      }
      
      setJobs(jobsData);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyClick = (job) => {
    const jobId = job.id || job._id;
    console.log('🟢 Apply Clicked - Job ID:', jobId);
    console.log('🟢 Apply Clicked - Job Title:', job.title);
    
    if (!isAuthenticated) {
      sessionStorage.setItem('pendingJobId', jobId);
      navigate('/login');
      return;
    }
    setSelectedJobId(jobId);
    setTimeout(() => {
      document.getElementById('application-form-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  const handleApplySuccess = () => {
    setSelectedJobId('');
  };

  const handleJobSelect = (jobId) => {
    setSelectedJobId(jobId);
  };

  return (
    <>
      <MetaTags 
        title="Careers at Wave pilot- Marine Jobs & Opportunities"
        description="Explore exciting career opportunities in marine robotics, autonomous systems, and subsea technology at Hydrocean."
        keywords="marine jobs, robotics careers, autonomous vehicles, USV jobs, AUV jobs, subsea engineering"
      />
      <Header />
      <main className="pt-20 pb-24 lg:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-dark-200">
              Career Opportunities
            </h1>
            <p className="text-slate-500 mt-2">
              Join our team of marine technology experts
            </p>
          </div>

          <JobFilters filters={filters} setFilters={setFilters} />
          
          {loading ? (
            <LoadingSpinner />
          ) : (
            <JobList 
              jobs={jobs} 
              onApplyClick={handleApplyClick}
            />
          )}

          <div id="application-form-section" className="mt-16">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8">
              <h2 className="text-2xl font-display font-bold text-dark-200 mb-6">
                Apply for Position
              </h2>
              <ApplicationForm 
                jobId={selectedJobId}
                jobs={jobs}
                onJobSelect={handleJobSelect}
                onSuccess={handleApplySuccess}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
};

export default Jobs;