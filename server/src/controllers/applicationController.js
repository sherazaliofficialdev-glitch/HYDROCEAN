import Application from '../models/Application.js';
import Job from '../models/Job.js';
import Notification from '../models/Notification.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';
import { sendStatusUpdateEmail } from '../services/emailService.js';
import { generateTrackingId } from '../utils/generateTrackingId.js';
import { uploadToCloudinary } from '../services/uploadService.js';
import mongoose from 'mongoose';

// ✅ Apply for a job with Cloudinary upload
export const applyForJob = catchAsync(async (req, res, next) => {
  console.log('=========================================');
  console.log('📝 APPLICATION SUBMIT REQUEST');
  console.log('📋 Request Body:', JSON.stringify(req.body, null, 2));
  console.log('📎 Request Files:', req.files ? Object.keys(req.files) : 'No files');
  console.log('📧 User:', req.user ? req.user.email : 'No user');
  console.log('=========================================');

  const {
    jobId,
    firstName,
    lastName,
    fatherName,
    whatsAppNumber,
    experience,
    aboutYourself,
    email,
    depositSlipNumber,
  } = req.body;

  console.log('🔍 JobId value:', jobId);
  console.log('🔍 JobId type:', typeof jobId);
  console.log('🔍 JobId length:', jobId ? jobId.length : 0);

  // ✅ Validate required fields
  if (!jobId) {
    console.log('❌ Job ID missing');
    return next(new AppError('Job ID is required.', 400));
  }

  // ✅ Validate if jobId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    console.log('❌ Invalid Job ID format:', jobId);
    return next(new AppError('Invalid Job ID format. Please select a valid job.', 400));
  }

  if (!firstName || !lastName || !fatherName || !whatsAppNumber || !experience || !aboutYourself) {
    console.log('❌ Missing required fields');
    return next(new AppError('All personal information fields are required.', 400));
  }

  // ✅ Check if job exists
  const job = await Job.findById(jobId);
  if (!job) {
    console.log('❌ Job not found:', jobId);
    return next(new AppError('Job not found. Please select a valid job.', 404));
  }

  console.log('✅ Job found:', job.title);

  // ✅ Check if user already applied
  const existingApplication = await Application.findOne({
    jobId,
    userId: req.user._id,
  });

  if (existingApplication) {
    console.log('❌ User already applied for this job');
    return next(new AppError('You have already applied for this position.', 400));
  }

  // ✅ Upload files to Cloudinary
  let candidatePhotoUrl = '';
  let cvUrl = '';
  let depositSlipUrl = '';

  // ✅ Upload candidate photo
  if (req.files && req.files.candidatePhoto && req.files.candidatePhoto.length > 0) {
    try {
      const photoFile = req.files.candidatePhoto[0];
      console.log('📎 Photo file:', {
        name: photoFile.originalname,
        size: photoFile.size,
        bufferLength: photoFile.buffer ? photoFile.buffer.length : 0,
      });
      
      if (!photoFile.buffer || photoFile.buffer.length === 0) {
        console.error('❌ Photo buffer is empty');
      } else {
        const photoResult = await uploadToCloudinary(photoFile.buffer, {
          folder: 'Wave pilot/applicants/photos',
          resource_type: 'image',
        });
        candidatePhotoUrl = photoResult.secure_url;
        console.log('✅ Photo uploaded:', candidatePhotoUrl);
      }
    } catch (error) {
      console.error('❌ Photo upload error:', error.message);
    }
  }

  // ✅ Upload CV
  if (req.files && req.files.cv && req.files.cv.length > 0) {
    try {
      const cvFile = req.files.cv[0];
      console.log('📎 CV file:', {
        name: cvFile.originalname,
        size: cvFile.size,
        bufferLength: cvFile.buffer ? cvFile.buffer.length : 0,
      });
      
      if (!cvFile.buffer || cvFile.buffer.length === 0) {
        console.error('❌ CV buffer is empty');
      } else {
        const cvResult = await uploadToCloudinary(cvFile.buffer, {
          folder: 'Wave pilot/applicants/cv',
          resource_type: 'auto',
        });
        cvUrl = cvResult.secure_url;
        console.log('✅ CV uploaded:', cvUrl);
      }
    } catch (error) {
      console.error('❌ CV upload error:', error.message);
    }
  }

  // ✅ Upload deposit slip
  if (req.files && req.files.depositSlip && req.files.depositSlip.length > 0) {
    try {
      const slipFile = req.files.depositSlip[0];
      console.log('📎 Deposit slip file:', {
        name: slipFile.originalname,
        size: slipFile.size,
        bufferLength: slipFile.buffer ? slipFile.buffer.length : 0,
      });
      
      if (!slipFile.buffer || slipFile.buffer.length === 0) {
        console.error('❌ Deposit slip buffer is empty');
      } else {
        const slipResult = await uploadToCloudinary(slipFile.buffer, {
          folder: 'Wave pilot/applicants/deposits',
          resource_type: 'image',
        });
        depositSlipUrl = slipResult.secure_url;
        console.log('✅ Deposit slip uploaded:', depositSlipUrl);
      }
    } catch (error) {
      console.error('❌ Deposit slip upload error:', error.message);
    }
  }

  // ✅ Create application
  const application = await Application.create({
    trackingId: generateTrackingId(),
    jobId: job._id,
    jobTitle: job.title,
    userId: req.user._id,
    firstName,
    lastName,
    fatherName,
    whatsAppNumber,
    experience,
    aboutYourself,
    email: email || req.user.email,
    candidatePhoto: candidatePhotoUrl,
    cvUrl: cvUrl,
    depositSlipUrl: depositSlipUrl,
    depositSlipNumber: depositSlipNumber || '',
    status: 'Pending',
  });

  console.log('✅ Application created:', application._id);

  // ✅ Create notification for user
  await Notification.create({
    userId: req.user._id,
    title: 'Application Submitted ✅',
    message: `Your application for "${job.title}" has been submitted successfully.`,
    type: 'application',
    link: '/dashboard',
    metadata: { applicationId: application._id },
  });

  // ✅ Create notification for admin
  await Notification.create({
    userId: req.user._id,
    title: 'New Application Received 📩',
    message: `${firstName} ${lastName} applied for "${job.title}"`,
    type: 'application',
    link: `/admin/applications/${application._id}`,
    metadata: { applicationId: application._id },
  });

  res.status(201).json({
    success: true,
    applicationId: application._id,
    trackingId: application.trackingId,
    message: 'Application submitted successfully.',
  });
});

// ✅ Get user's applications
export const getUserApplications = catchAsync(async (req, res, next) => {
  const applications = await Application.find({ userId: req.user._id })
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    applications,
  });
});

// ✅ Get single application
export const getApplication = catchAsync(async (req, res, next) => {
  const application = await Application.findById(req.params.id)
    .populate('jobId', 'title country');
  
  if (!application) {
    return next(new AppError('Application not found.', 404));
  }

  if (application.userId.toString() !== req.user._id.toString() && req.user.role === 'user') {
    return next(new AppError('You do not have permission to view this application.', 403));
  }

  res.status(200).json({
    success: true,
    application,
  });
});

// ✅ Get application stats
export const getApplicationStats = catchAsync(async (req, res, next) => {
  const stats = await Application.aggregate([
    { $match: { userId: req.user._id } },
    { $group: {
      _id: '$status',
      count: { $sum: 1 },
    }},
  ]);

  const total = await Application.countDocuments({ userId: req.user._id });

  const result = {
    total,
    pending: 0,
    approved: 0,
    rejected: 0,
  };

  stats.forEach((stat) => {
    if (stat._id === 'Pending') result.pending = stat.count;
    else if (stat._id === 'Approved') result.approved = stat.count;
    else if (stat._id === 'Rejected') result.rejected = stat.count;
  });

  res.status(200).json({
    success: true,
    stats: result,
  });
});