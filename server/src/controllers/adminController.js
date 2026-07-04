import mongoose from 'mongoose';
import User from '../models/User.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import Contact from '../models/Contact.js';
import Visitor from '../models/Visitor.js';
import Notification from '../models/Notification.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';
import { sendStatusUpdateEmail, sendContactReplyEmail } from '../services/emailService.js';

// ==================== DASHBOARD STATS ====================

export const getDashboardStats = catchAsync(async (req, res, next) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  
  const monthAgo = new Date(today);
  monthAgo.setDate(monthAgo.getDate() - 30);

  const [
    totalUsers,
    usersToday,
    totalJobs,
    activeJobs,
    totalApplications,
    pendingApplications,
    approvedApplications,
    rejectedApplications,
    totalContacts,
    unreadContacts,
    visitorsToday,
    visitorsThisWeek,
    visitorsThisMonth,
    totalVisitors,
  ] = await Promise.all([
    User.countDocuments({ isDeleted: false }),
    User.countDocuments({ createdAt: { $gte: today }, isDeleted: false }),
    Job.countDocuments(),
    Job.countDocuments({ isOpen: true, isHidden: false }),
    Application.countDocuments(),
    Application.countDocuments({ status: 'Pending' }),
    Application.countDocuments({ status: 'Approved' }),
    Application.countDocuments({ status: 'Rejected' }),
    Contact.countDocuments(),
    Contact.countDocuments({ status: 'Unread' }),
    Visitor.countDocuments({ createdAt: { $gte: today } }),
    Visitor.countDocuments({ createdAt: { $gte: weekAgo } }),
    Visitor.countDocuments({ createdAt: { $gte: monthAgo } }),
    Visitor.countDocuments(),
  ]);

  const statusBreakdown = await Application.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  const breakdown = {};
  statusBreakdown.forEach((item) => {
    breakdown[item._id] = item.count;
  });

  const recentActivities = await Notification.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .populate('userId', 'firstName lastName');

  res.status(200).json({
    success: true,
    stats: {
      totalUsers,
      usersToday,
      totalJobs,
      activeJobs,
      totalApplications,
      pendingApplications,
      approvedApplications,
      rejectedApplications,
      totalContacts,
      unreadContacts,
      visitorsToday,
      visitorsThisWeek,
      visitorsThisMonth,
      totalVisitors,
      statusBreakdown: breakdown,
      recentActivities: recentActivities.map(a => ({
        id: a._id,
        action: a.title,
        description: a.message,
        timestamp: a.createdAt,
        user: a.userId ? `${a.userId.firstName} ${a.userId.lastName}` : 'System',
      })),
    },
  });
});

// ==================== USER MANAGEMENT ====================

export const getUsers = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10, search, role, status } = req.query;
  
  const query = {};
  
  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }
  
  if (role) {
    query.role = role;
  }
  
  if (status === 'blocked') {
    query.isBlocked = true;
  } else if (status === 'active') {
    query.isBlocked = false;
    query.isDeleted = false;
  } else if (status === 'deleted') {
    query.isDeleted = true;
  }

  const users = await User.find(query)
    .select('-password')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await User.countDocuments(query);

  res.status(200).json({
    success: true,
    users,
    totalPages: Math.ceil(total / limit),
    currentPage: Number(page),
    total,
  });
});

export const getUserById = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  
  if (!userId) {
    return next(new AppError('User ID is required.', 400));
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new AppError('Invalid user ID format.', 400));
  }

  const user = await User.findById(userId).select('-password');
  
  if (!user) {
    return next(new AppError('User not found.', 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const { firstName, lastName, email, phone } = req.body;
  
  if (!userId) {
    return next(new AppError('User ID is required.', 400));
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new AppError('Invalid user ID format.', 400));
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError('User not found.', 404));
  }

  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.email = email || user.email;
  user.phone = phone || user.phone;

  await user.save();

  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    },
  });
});

// ==================== BLOCK/UNBLOCK USER ====================

export const blockUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  
  if (!userId) {
    return next(new AppError('User ID is required.', 400));
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new AppError('Invalid user ID format.', 400));
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError('User not found.', 404));
  }

  if (user.role === 'admin') {
    return next(new AppError('Cannot block a main admin.', 403));
  }

  user.isBlocked = !user.isBlocked;
  await user.save();

  await Notification.create({
    userId: user._id,
    title: user.isBlocked ? 'Account Blocked' : 'Account Unblocked',
    message: user.isBlocked 
      ? 'Your account has been blocked. Please contact support for assistance.'
      : 'Your account has been unblocked. You can now login.',
    type: 'system',
  });

  res.status(200).json({
    success: true,
    message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully.`,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isBlocked: user.isBlocked,
    },
  });
});

// ==================== DELETE/RESTORE USER ====================

export const deleteUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  
  if (!userId) {
    return next(new AppError('User ID is required.', 400));
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new AppError('Invalid user ID format.', 400));
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError('User not found.', 404));
  }

  if (user.role === 'admin') {
    return next(new AppError('Cannot delete a main admin.', 403));
  }

  user.isDeleted = !user.isDeleted;
  await user.save();

  await Notification.create({
    userId: user._id,
    title: user.isDeleted ? 'Account Deleted' : 'Account Restored',
    message: user.isDeleted 
      ? 'Your account has been deleted. Contact support if this was a mistake.'
      : 'Your account has been restored. You can now login again.',
    type: 'system',
  });

  res.status(200).json({
    success: true,
    message: `User ${user.isDeleted ? 'deleted' : 'restored'} successfully.`,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isDeleted: user.isDeleted,
    },
  });
});

// ==================== UPDATE USER ROLE (Sub Admin) ====================

export const updateUserRole = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const { role, permissions } = req.body;
  
  if (!userId) {
    return next(new AppError('User ID is required.', 400));
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new AppError('Invalid user ID format.', 400));
  }

  const targetUser = await User.findById(userId);
  if (!targetUser) {
    return next(new AppError('User not found.', 404));
  }

  if (targetUser.role === 'admin' && req.user._id.toString() !== targetUser._id.toString()) {
    return next(new AppError('Cannot modify main admin role.', 403));
  }

  if (role === 'sub_admin' && req.user.role !== 'admin') {
    return next(new AppError('Only main admin can create sub admins.', 403));
  }

  if (targetUser.role === 'sub_admin' && req.user.role !== 'admin') {
    return next(new AppError('Only main admin can remove sub admins.', 403));
  }

  targetUser.role = role || targetUser.role;
  
  if (role === 'sub_admin') {
    targetUser.permissions = permissions || [
      'View Dashboard',
      'View Applications',
      'Manage Jobs',
      'Send Emails',
      'Approve Applications',
      'Reject Applications',
    ];
  } else if (role === 'user') {
    targetUser.permissions = [];
  }

  await targetUser.save();

  await Notification.create({
    userId: targetUser._id,
    title: 'Role Updated',
    message: `Your role has been updated to ${role}.`,
    type: 'system',
  });

  res.status(200).json({
    success: true,
    message: `User role updated to ${role} successfully.`,
    user: {
      id: targetUser._id,
      firstName: targetUser.firstName,
      lastName: targetUser.lastName,
      email: targetUser.email,
      role: targetUser.role,
      permissions: targetUser.permissions,
    },
  });
});

// ==================== APPLICATION MANAGEMENT ====================

export const getApplicationsAdmin = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10, search, status, jobId } = req.query;
  
  const query = {};
  
  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { trackingId: { $regex: search, $options: 'i' } },
    ];
  }
  
  if (status) {
    query.status = status;
  }
  
  if (jobId) {
    query.jobId = jobId;
  }

  const applications = await Application.find(query)
    .populate('userId', 'firstName lastName email')
    .populate('jobId', 'title')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Application.countDocuments(query);

  res.status(200).json({
    success: true,
    applications,
    totalPages: Math.ceil(total / limit),
    currentPage: Number(page),
    total,
  });
});

// ==================== UPDATE APPLICATION STATUS ====================

export const updateApplicationStatus = catchAsync(async (req, res, next) => {
  const { status, adminNotes, rejectionReason } = req.body;
  const applicationId = req.params.id;
  
  if (!applicationId) {
    return next(new AppError('Application ID is required.', 400));
  }

  if (!mongoose.Types.ObjectId.isValid(applicationId)) {
    return next(new AppError('Invalid application ID format.', 400));
  }

  const application = await Application.findById(applicationId)
    .populate('userId', 'firstName lastName email');
  
  if (!application) {
    return next(new AppError('Application not found.', 404));
  }

  // ✅ Update status
  application.status = status;
  application.adminNotes = adminNotes || application.adminNotes;
  application.rejectionReason = status === 'Rejected' ? (rejectionReason || 'No reason provided') : '';
  application.reviewedBy = req.user._id;
  application.reviewedAt = new Date();

  await application.save();

  // ✅ Send email notification
  try {
    await sendStatusUpdateEmail(
      application.userId.email,
      `${application.userId.firstName} ${application.userId.lastName}`,
      application.jobTitle,
      status
    );
  } catch (error) {
    console.log('⚠️ Email notification failed:', error.message);
  }

  // ✅ Create in-app notification for user
  await Notification.create({
    userId: application.userId._id,
    title: `Application ${status}`,
    message: `Your application for "${application.jobTitle}" has been ${status.toLowerCase()}.`,
    type: 'status',
    link: '/dashboard',
    metadata: { 
      applicationId: application._id, 
      status: status,
      jobTitle: application.jobTitle,
    },
  });

  // ✅ Also create notification for admin (confirmation)
  await Notification.create({
    userId: req.user._id,
    title: `Application ${status} - ${application.userId.firstName} ${application.userId.lastName}`,
    message: `You ${status.toLowerCase()} ${application.userId.firstName} ${application.userId.lastName}'s application for "${application.jobTitle}"`,
    type: 'status',
    link: `/admin/applications/${application._id}`,
    metadata: { 
      applicationId: application._id, 
      status: status,
    },
  });

  res.status(200).json({
    success: true,
    message: `Application ${status.toLowerCase()} successfully.`,
    application: {
      id: application._id,
      status: application.status,
      jobTitle: application.jobTitle,
      applicantName: `${application.userId.firstName} ${application.userId.lastName}`,
    },
  });
});

// ==================== DELETE APPLICATION ====================

export const deleteApplication = catchAsync(async (req, res, next) => {
  const applicationId = req.params.id;
  
  if (!applicationId) {
    return next(new AppError('Application ID is required.', 400));
  }

  if (!mongoose.Types.ObjectId.isValid(applicationId)) {
    return next(new AppError('Invalid application ID format.', 400));
  }

  const application = await Application.findById(applicationId);
  
  if (!application) {
    return next(new AppError('Application not found.', 404));
  }

  await application.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Application deleted successfully.',
  });
});

// ==================== CONTACT MANAGEMENT ====================

export const getContacts = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10, search, status } = req.query;
  
  const query = {};
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { subject: { $regex: search, $options: 'i' } },
    ];
  }
  
  if (status) {
    query.status = status;
  }

  const contacts = await Contact.find(query)
    .populate('userId', 'firstName lastName email')
    .populate('repliedBy', 'firstName lastName email')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Contact.countDocuments(query);

  res.status(200).json({
    success: true,
    contacts,
    totalPages: Math.ceil(total / limit),
    currentPage: Number(page),
    total,
  });
});

export const updateContactStatus = catchAsync(async (req, res, next) => {
  const contactId = req.params.id;
  
  if (!contactId) {
    return next(new AppError('Contact ID is required.', 400));
  }

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return next(new AppError('Invalid contact ID format.', 400));
  }

  const contact = await Contact.findById(contactId);
  if (!contact) {
    return next(new AppError('Contact message not found.', 404));
  }

  const { status } = req.body;
  contact.status = status;
  await contact.save();

  res.status(200).json({
    success: true,
    message: 'Contact status updated.',
    contact,
  });
});

export const replyContact = catchAsync(async (req, res, next) => {
  const contactId = req.params.id;
  const { replyMessage } = req.body;
  
  if (!contactId) {
    return next(new AppError('Contact ID is required.', 400));
  }

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return next(new AppError('Invalid contact ID format.', 400));
  }

  const contact = await Contact.findById(contactId)
    .populate('userId', 'firstName lastName email');
  
  if (!contact) {
    return next(new AppError('Contact message not found.', 404));
  }

  contact.replyMessage = replyMessage;
  contact.status = 'Replied';
  contact.repliedAt = new Date();
  contact.repliedBy = req.user._id;

  await contact.save();

  await sendContactReplyEmail(
    contact.email,
    contact.name,
    contact.subject,
    replyMessage
  );

  if (contact.userId) {
    await Notification.create({
      userId: contact.userId._id,
      title: 'Reply to Your Inquiry',
      message: `Admin has replied to your inquiry: ${contact.subject}`,
      type: 'contact',
      link: '/contact',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Reply sent successfully.',
    contact,
  });
});

export const deleteContact = catchAsync(async (req, res, next) => {
  const contactId = req.params.id;
  
  if (!contactId) {
    return next(new AppError('Contact ID is required.', 400));
  }

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return next(new AppError('Invalid contact ID format.', 400));
  }

  const contact = await Contact.findById(contactId);
  
  if (!contact) {
    return next(new AppError('Contact message not found.', 404));
  }

  await contact.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Contact message deleted successfully.',
  });
});

// ==================== GLOBAL SEARCH ====================

export const globalSearch = catchAsync(async (req, res, next) => {
  const { q } = req.query;
  
  if (!q || q.length < 2) {
    return res.status(200).json({
      success: true,
      results: {
        users: [],
        jobs: [],
        applications: [],
      },
    });
  }

  const searchRegex = new RegExp(q, 'i');

  const [users, jobs, applications] = await Promise.all([
    User.find({
      $or: [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
      ],
      isDeleted: false,
    }).select('firstName lastName email role isBlocked').limit(10),
    
    Job.find({
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { country: searchRegex },
      ],
      isHidden: false,
    }).limit(10),
    
    Application.find({
      $or: [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
        { trackingId: searchRegex },
      ],
    })
    .populate('userId', 'firstName lastName email')
    .populate('jobId', 'title')
    .limit(10),
  ]);

  res.status(200).json({
    success: true,
    results: {
      users,
      jobs,
      applications,
    },
  });
});