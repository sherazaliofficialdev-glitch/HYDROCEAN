import React from 'react';
import { FileUp, Camera, CreditCard, FileText, Landmark, User, Award } from 'lucide-react';

const Step2Documents = ({ formData, onFileChange, onChange }) => {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 mb-4">
        <FileUp className="h-5 w-5 text-primary-500" />
        <h3 className="text-lg font-bold text-dark-200">Document Upload</h3>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        <p className="font-semibold">Important:</p>
        <p>Please ensure all documents are clear and readable. Maximum file size is 10MB per file.</p>
      </div>

      {/* Candidate Photo */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
          Candidate Photo *
        </label>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="file"
              name="candidatePhoto"
              accept="image/*"
              onChange={onFileChange}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 transition"
            />
          </div>
          <Camera className="h-5 w-5 text-slate-400 shrink-0" />
        </div>
        {formData.candidatePhoto && (
          <p className="text-xs text-emerald-600 mt-2">✓ {formData.candidatePhoto.name}</p>
        )}
      </div>

      {/* CV Upload */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
          CV / Resume *
        </label>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="file"
              name="cv"
              accept=".pdf,.doc,.docx"
              onChange={onFileChange}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 transition"
            />
          </div>
          <FileText className="h-5 w-5 text-slate-400 shrink-0" />
        </div>
        {formData.cv && (
          <p className="text-xs text-emerald-600 mt-2">✓ {formData.cv.name}</p>
        )}
      </div>

      {/* Deposit Slip */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
          Bank Deposit Slip *
        </label>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="file"
              name="depositSlip"
              accept="image/*,.pdf"
              onChange={onFileChange}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 transition"
            />
          </div>
          <CreditCard className="h-5 w-5 text-slate-400 shrink-0" />
        </div>
        {formData.depositSlip && (
          <p className="text-xs text-emerald-600 mt-2">✓ {formData.depositSlip.name}</p>
        )}
      </div>

      {/* Deposit Slip Number */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
          Deposit Slip Number (Optional)
        </label>
        <input
          type="text"
          name="depositSlipNumber"
          value={formData.depositSlipNumber}
          onChange={onChange}
          placeholder="Enter the reference number from your deposit slip"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
        />
      </div>

      {/* ✅ Updated Payment Instructions */}
      <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 text-sm text-primary-800">
        <p className="font-semibold text-lg mb-3 flex items-center gap-2">
          <Landmark className="h-5 w-5" />
          Payment Instructions:
        </p>
        <div className="space-y-2 font-mono bg-white/50 p-4 rounded-lg border border-primary-100">
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-primary-600" />
            <span><strong>Representative:</strong> HAMZA ARIF</span>
          </div>
          <div className="flex items-center gap-3">
            <Award className="h-4 w-4 text-primary-600" />
            <span><strong>Registration Number:</strong> 95010105700533</span>
          </div>
          <div className="flex items-center gap-3">
            <CreditCard className="h-4 w-4 text-primary-600" />
            <span><strong>IBAN:</strong> PK84MEZN0095010105700533</span>
          </div>
          <div className="flex items-center gap-3">
            <Landmark className="h-4 w-4 text-primary-600" />
            <span><strong>Branch:</strong> KOT ADDU BRANCH</span>
          </div>
        </div>
        <p className="text-xs mt-3 text-primary-600">
          Please deposit the application fee at Meezan Bank and upload the deposit slip above.
        </p>
      </div>
    </div>
  );
};

export default Step2Documents;