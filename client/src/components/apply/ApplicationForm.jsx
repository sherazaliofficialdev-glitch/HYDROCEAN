import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle, Briefcase, Zap } from 'lucide-react';
import Step1PersonalInfo from './Step1PersonalInfo';
import Step2Documents from './Step2Documents';
import ApplicationSuccess from './ApplicationSuccess';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import API from '../../utils/api';

const ApplicationForm = ({ jobId, jobs = [], onJobSelect, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [selectedJobId, setSelectedJobId] = useState(jobId || '');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fatherName: '',
    whatsAppNumber: '',
    experience: '',
    aboutYourself: '',
    candidatePhoto: null,
    cv: null,
    depositSlip: null,
    depositSlipNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const { user } = useAuth();
  const { showError, showSuccess } = useToast();
  const navigate = useNavigate();

  // ✅ Update selected job when prop changes
  useEffect(() => {
    if (jobId) {
      setSelectedJobId(jobId);
      if (onJobSelect) {
        onJobSelect(jobId);
      }
    }
  }, [jobId, onJobSelect]);

  // ✅ Power Bank Job - Always Available
  const powerBankJob = {
    id: 'power-bank-offer',
    title: '⚡ Power Bank Special Offer',
    country: 'Pakistan (All Cities)',
    salary: 'Rs. 3,000/- (Deposit)',
    description: 'Wave Pilot is offering a chance to those applicants who shall become its customer by purchasing our mobile power bank. All applicants shall be invited for FREE Lunch where date for Online test shall be announced physically and also on website. The candidates who shall pass the examination shall be selected.',
    isOpen: true,
    isPowerBank: true
  };

  // ✅ Combine jobs with Power Bank option
  const allOptions = [powerBankJob, ...jobs];

  // ✅ Check if selected job is Power Bank
  const isPowerBankSelected = selectedJobId === 'power-bank-offer';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleJobChange = (e) => {
    const value = e.target.value;
    console.log('🔍 Selected Job ID from dropdown:', value);
    setSelectedJobId(value);
    if (onJobSelect) {
      onJobSelect(value);
    }
  };

  const handleSubmit = async () => {
    console.log('📤 Submitting Application with Job ID:', selectedJobId);

    if (!selectedJobId) {
      showError('Please select a job position.');
      return;
    }

    setLoading(true);
    try {
      const formPayload = new FormData();
      
      // ✅ If Power Bank selected, send special jobId
      if (selectedJobId === 'power-bank-offer') {
        formPayload.append('jobId', 'power-bank-offer');
        formPayload.append('jobTitle', 'Power Bank Special Offer');
      } else {
        formPayload.append('jobId', selectedJobId);
      }
      
      formPayload.append('firstName', formData.firstName);
      formPayload.append('lastName', formData.lastName);
      formPayload.append('fatherName', formData.fatherName);
      formPayload.append('whatsAppNumber', formData.whatsAppNumber);
      formPayload.append('experience', formData.experience);
      formPayload.append('aboutYourself', formData.aboutYourself);
      formPayload.append('email', user?.email || '');
      
      if (formData.candidatePhoto) {
        formPayload.append('candidatePhoto', formData.candidatePhoto);
      }
      if (formData.cv) {
        formPayload.append('cv', formData.cv);
      }
      if (formData.depositSlip) {
        formPayload.append('depositSlip', formData.depositSlip);
      }
      formPayload.append('depositSlipNumber', formData.depositSlipNumber || '');

      const response = await API.post('/applications/apply', formPayload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setTrackingId(response.data.trackingId || '');
      setSuccess(true);
      showSuccess('Application submitted successfully!');
      
      if (onSuccess) {
        onSuccess();
      }
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (error) {
      console.error('❌ Application error:', error);
      showError(error.response?.data?.message || 'Failed to submit application.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (!selectedJobId) {
      showError('Please select a job position first.');
      return;
    }

    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.fatherName || 
          !formData.whatsAppNumber || !formData.experience || !formData.aboutYourself) {
        showError('Please fill in all required fields.');
        return;
      }
      if (formData.aboutYourself.length > 20000) {
        showError('About Yourself must be less than 20,000 characters.');
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  if (success) {
    return <ApplicationSuccess trackingId={trackingId} />;
  }

  // ✅ Get selected job object
  const selectedJob = allOptions.find(j => j.id === selectedJobId);

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8">
      {/* ✅ Job Selection Dropdown - Power Bank Always Available */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-primary-500" />
          Select Job Position *
        </label>
        <div>
          <select
            value={selectedJobId}
            onChange={handleJobChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
          >
            <option value="">-- Choose a Job --</option>
            {/* ✅ Power Bank Option - Always First */}
            <option value="power-bank-offer" className="font-bold text-amber-600">
              ⚡ Power Bank Special Offer
            </option>
            {/* ✅ Regular Jobs */}
            {jobs.map((job) => {
              const jobId = job.id || job._id;
              return (
                <option key={jobId} value={jobId}>
                  {job.title} ({job.country})
                </option>
              );
            })}
          </select>
          
          {/* ✅ Show selected job details */}
          {selectedJobId && selectedJob && (
            <div className={`mt-3 p-4 rounded-xl border ${
              isPowerBankSelected 
                ? 'bg-amber-50 border-amber-200' 
                : 'bg-primary-50 border-primary-100'
            }`}>
              <div className="flex items-start gap-3">
                {isPowerBankSelected ? (
                  <Zap className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                ) : (
                  <Briefcase className="h-5 w-5 text-primary-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-sm font-semibold text-dark-200 flex items-center gap-2">
                    Selected: {selectedJob.title}
                    {isPowerBankSelected && (
                      <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                        Special Offer
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedJob.country} • {selectedJob.salary}
                  </p>
                  {isPowerBankSelected && (
                    <p className="text-xs text-amber-700 mt-2 bg-amber-100/50 p-2 rounded-lg">
                      💡 Deposit Rs. 3,000/- and get 10,000 mAh Power Bank + FREE Lunch + Online Test opportunity
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Power Bank Specific Note */}
      {isPowerBankSelected && (
        <div className="mb-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">⚡ Power Bank Offer Application</p>
              <p className="text-xs text-amber-700 mt-1">
                You are applying for the Power Bank Special Offer. Please deposit Rs. 3,000/- and upload the deposit slip.
              </p>
              <ul className="text-xs text-amber-700 mt-2 space-y-1 list-disc list-inside">
                <li>Get 10,000 mAh Power Bank</li>
                <li>Invitation to FREE Lunch</li>
                <li>Online Test opportunity</li>
                <li>Selection for Maldives positions</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-500 rounded-full transition-all duration-500"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>
        <span className="text-xs font-bold text-primary-500">
          Step {step} of 2
        </span>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Step1PersonalInfo 
              formData={formData} 
              onChange={handleChange}
            />
            <button
              onClick={nextStep}
              disabled={!selectedJobId}
              className="w-full py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Step
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Step2Documents 
              formData={formData}
              onFileChange={handleFileChange}
              onChange={handleChange}
            />
            <div className="flex gap-4 mt-6">
              <button
                onClick={prevStep}
                className="flex-1 py-3.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4.5 w-4.5" />
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || !selectedJobId}
                className="flex-1 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Submit Application
                    <Sparkles className="h-4.5 w-4.5" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ApplicationForm;