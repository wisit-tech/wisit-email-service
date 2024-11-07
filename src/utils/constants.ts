// utils/constants.ts

// Allowed file types for upload validation
export const ALLOWED_FILE_TYPES = /\.(png|jpeg|jpg|pdf|docx|txt|svg)$/;

// Maximum allowed file size (5MB)
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Email constants (default values can be set for email-related settings)
export const EMAIL_SOURCE = process.env.EMAIL_ID || 'default@domain.com';

// Construct the full service endpoint dynamically using DNS and port
export const SERVICE_ENDPOINT = process.env.SERVICE_ENDPOINT && process.env.PORT
  ? `${process.env.SERVICE_DNS}:${process.env.PORT}`  // Combine DNS and port
  : '';  // Default to localhost if not provided in env
//   : 'http://localhost:8004'; 
