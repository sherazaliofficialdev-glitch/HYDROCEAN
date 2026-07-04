export const APP_NAME = 'Wave pilot Systems';
export const APP_URL = 'https://hydrocean.com';

export const STATUS_COLORS = {
  Pending: 'bg-amber-50 text-amber-600 border-amber-200',
  Approved: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  Rejected: 'bg-rose-50 text-rose-600 border-rose-200',
};

export const STATUS_ICONS = {
  Pending: 'Clock',
  Approved: 'CheckCircle',
  Rejected: 'XCircle',
};

export const FILE_UPLOAD_CONFIG = {
  maxSize: 10, // MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  allowedDocumentTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

export const JOB_FILTERS = {
  status: ['open', 'closed', 'all'],
  sortBy: ['latest', 'alphabetical'],
};

export const USER_ROLES = {
  ADMIN: 'admin',
  SUB_ADMIN: 'sub_admin',
  USER: 'user',
};

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
};