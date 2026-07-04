import cloudinary from '../config/cloudinary.js';
import { AppError } from '../utils/AppError.js';
import streamifier from 'streamifier';

export const uploadToCloudinary = async (fileBuffer, options = {}) => {
  try {
    // ✅ Check if buffer is empty
    if (!fileBuffer || fileBuffer.length === 0) {
      console.error('❌ File buffer is empty');
      throw new AppError('File buffer is empty. No file to upload.', 400);
    }

    console.log('📤 Uploading to Cloudinary - Buffer size:', fileBuffer.length);

    return new Promise((resolve, reject) => {
      // ✅ Using upload_stream for buffer upload
      const uploadOptions = {
        folder: options.folder || 'Wave pilot',
        resource_type: options.resource_type || 'auto',
        quality: 'auto:good',
        transformation: options.transformation || [
          { quality: 'auto:good' },
          { fetch_format: 'auto' }
        ],
        // ✅ No upload_preset needed for server-side upload
        ...options,
      };

      console.log('📤 Upload options:', {
        folder: uploadOptions.folder,
        resource_type: uploadOptions.resource_type,
      });

      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            console.error('❌ Cloudinary upload error:', {
              message: error.message,
              http_code: error.http_code,
              name: error.name,
            });
            reject(new AppError(`Upload failed: ${error.message}`, error.http_code || 500));
          } else {
            console.log('✅ Cloudinary upload successful:', result.secure_url);
            resolve(result);
          }
        }
      );

      // ✅ Pipe buffer to upload stream
      streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
  } catch (error) {
    console.error('❌ Upload service error:', error);
    throw new AppError(`Upload failed: ${error.message}`, 500);
  }
};

export const uploadMultiple = async (files, folder = 'Wave pilot') => {
  const uploads = [];
  
  for (const [key, fileArray] of Object.entries(files)) {
    if (fileArray && fileArray.length > 0) {
      const file = fileArray[0];
      // ✅ Check if buffer exists
      if (!file.buffer || file.buffer.length === 0) {
        console.error(`❌ No buffer for ${key}`);
        continue;
      }
      console.log(`📎 Uploading ${key}:`, {
        name: file.originalname,
        size: file.size,
        bufferLength: file.buffer.length,
      });
      const result = await uploadToCloudinary(file.buffer, {
        folder: `${folder}/${key}`,
      });
      uploads.push({ field: key, url: result.secure_url });
    }
  }
  
  return uploads;
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  } catch (error) {
    console.error('❌ Cloudinary delete error:', error);
    throw error;
  }
};