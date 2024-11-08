// utils/constants.ts
const isProduction = process.env.NODE_ENV === "production";

// Allowed file types for upload validation
export const ALLOWED_FILE_TYPES = /\.(png|jpeg|jpg|pdf|docx|txt|svg)$/;

// Maximum allowed file size (5MB)
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Email constants (default values can be set for email-related settings)
export const EMAIL_SOURCE = process.env.EMAIL_ID || "default@domain.com";
export const API_KEY = process.env.PASSWORD;
// Construct the full service endpoint dynamically using DNS and port
export const SERVICE_ENDPOINT = isProduction
  ? `${process.env.SERVICE_DNS}:${process.env.PORT}` // Combine DNS and port
  : "http://localhost:8004";
