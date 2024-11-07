import validator from 'validator';

/**
 * Validates an email address format.
 * @param email - The email address to validate.
 * @returns True if valid, false otherwise.
 */
export const isValidEmail = (email: string): boolean => {
  return validator.isEmail(email);
};
