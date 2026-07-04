import React, { useRef } from 'react';
import { Camera, X } from 'lucide-react';
import { motion } from 'framer-motion';

const ImageUpload = ({
  label,
  value,
  onChange,
  error,
  maxSize = 5,
  className = '',
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`Image size exceeds ${maxSize}MB limit.`);
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
      }
      onChange(file);
    }
  };

  const handleRemove = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getPreview = () => {
    if (typeof value === 'string') {
      return value;
    }
    if (value instanceof File) {
      return URL.createObjectURL(value);
    }
    return null;
  };

  const previewUrl = getPreview();

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
          {label}
        </label>
      )}

      <div
        className={`
          relative rounded-xl overflow-hidden
          ${error ? 'border-2 border-red-500' : ''}
        `}
      >
        {previewUrl ? (
          <div className="relative group aspect-video">
            <img
              src={previewUrl}
              alt="Upload preview"
              className="w-full h-full "
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 bg-white rounded-lg text-slate-700 hover:bg-slate-100 transition"
              >
                <Camera className="h-5 w-5" />
              </button>
              <button
                onClick={handleRemove}
                className="p-2 bg-white rounded-lg text-rose-500 hover:bg-rose-50 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`
              aspect-video border-2 border-dashed rounded-xl
              flex flex-col items-center justify-center cursor-pointer
              hover:border-primary-300 hover:bg-slate-50 transition-all
              ${error ? 'border-red-500' : 'border-slate-200'}
            `}
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="h-10 w-10 text-slate-400 mb-2" />
            <p className="text-sm text-slate-500">Click to upload image</p>
            <p className="text-xs text-slate-400">Max {maxSize}MB</p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {error && (
        <p className="text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
};

export default ImageUpload;