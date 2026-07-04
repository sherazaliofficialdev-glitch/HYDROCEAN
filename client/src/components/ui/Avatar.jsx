import React from 'react';

const Avatar = ({
  src,
  name,
  size = 'md',
  className = '',
  ...props
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-20 h-20 text-xl',
  };

  const getInitials = () => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  if (src) {
    return (
      <img
        src={src}
        alt={name || 'Avatar'}
        className={`
          rounded-full  border border-slate-200
          ${sizes[size]}
          ${className}
        `}
        {...props}
      />
    );
  }

  return (
    <div
      className={`
        rounded-full bg-primary-50 border border-primary-100
        flex items-center justify-center font-bold text-primary-600
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {getInitials()}
    </div>
  );
};

export default Avatar;