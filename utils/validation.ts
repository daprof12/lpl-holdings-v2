/**
 * Validation utilities for forms and user input
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate email address
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email || email.trim().length === 0) {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  return { isValid: true };
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password || password.length === 0) {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters' };
  }

  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }

  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' };
  }

  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }

  if (!/[!@#$%^&*]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one special character (!@#$%^&*)' };
  }

  return { isValid: true };
};

/**
 * Validate phone number
 */
export const validatePhone = (phone: string): ValidationResult => {
  if (!phone || phone.trim().length === 0) {
    return { isValid: false, error: 'Phone number is required' };
  }

  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  if (!phoneRegex.test(phone)) {
    return { isValid: false, error: 'Invalid phone number format' };
  }

  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    return { isValid: false, error: 'Phone number must be between 10-15 digits' };
  }

  return { isValid: true };
};

/**
 * Validate trading amount
 */
export const validateAmount = (amount: string | number, min: number = 0, max?: number): ValidationResult => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(numAmount)) {
    return { isValid: false, error: 'Please enter a valid amount' };
  }

  if (numAmount <= min) {
    return { isValid: false, error: `Amount must be greater than ${min}` };
  }

  if (max !== undefined && numAmount > max) {
    return { isValid: false, error: `Amount cannot exceed ${max}` };
  }

  return { isValid: true };
};

/**
 * Validate cryptocurrency address
 */
export const validateCryptoAddress = (address: string, currency: string): ValidationResult => {
  if (!address || address.trim().length === 0) {
    return { isValid: false, error: 'Address is required' };
  }

  // Basic validation - in production, use currency-specific validation
  switch (currency.toUpperCase()) {
    case 'BTC':
      if (!/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[a-z0-9]{39,59}$/.test(address)) {
        return { isValid: false, error: 'Invalid Bitcoin address' };
      }
      break;
    case 'ETH':
      if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
        return { isValid: false, error: 'Invalid Ethereum address' };
      }
      break;
    default:
      if (address.length < 20 || address.length > 100) {
        return { isValid: false, error: 'Invalid address format' };
      }
  }

  return { isValid: true };
};

/**
 * Validate required field
 */
export const validateRequired = (value: any, fieldName: string = 'This field'): ValidationResult => {
  if (value === null || value === undefined || value === '' || (typeof value === 'string' && value.trim() === '')) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  return { isValid: true };
};

/**
 * Validate date
 */
export const validateDate = (date: string | Date, minDate?: Date, maxDate?: Date): ValidationResult => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return { isValid: false, error: 'Invalid date' };
  }

  if (minDate && dateObj < minDate) {
    return { isValid: false, error: `Date must be after ${minDate.toLocaleDateString()}` };
  }

  if (maxDate && dateObj > maxDate) {
    return { isValid: false, error: `Date must be before ${maxDate.toLocaleDateString()}` };
  }

  return { isValid: true };
};

/**
 * Validate URL
 */
export const validateURL = (url: string): ValidationResult => {
  if (!url || url.trim().length === 0) {
    return { isValid: false, error: 'URL is required' };
  }

  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Invalid URL format' };
  }
};

/**
 * Validate file size
 */
export const validateFileSize = (file: File, maxSizeMB: number): ValidationResult => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
  if (file.size > maxSizeBytes) {
    return { isValid: false, error: `File size must be less than ${maxSizeMB}MB` };
  }

  return { isValid: true };
};

/**
 * Validate file type
 */
export const validateFileType = (file: File, allowedTypes: string[]): ValidationResult => {
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: `File type must be one of: ${allowedTypes.join(', ')}` };
  }

  return { isValid: true };
};

/**
 * Validate leverage
 */
export const validateLeverage = (leverage: number): ValidationResult => {
  const allowedLeverage = [1, 2, 5, 10, 20, 50, 100];

  if (!allowedLeverage.includes(leverage)) {
    return { isValid: false, error: 'Invalid leverage value' };
  }

  return { isValid: true };
};

/**
 * Validate stop loss / take profit
 */
export const validateStopLossTakeProfit = (
  entryPrice: number,
  stopLoss?: number,
  takeProfit?: number,
  type: 'long' | 'short' = 'long'
): ValidationResult => {
  if (stopLoss) {
    if (type === 'long' && stopLoss >= entryPrice) {
      return { isValid: false, error: 'Stop loss must be below entry price for long positions' };
    }
    if (type === 'short' && stopLoss <= entryPrice) {
      return { isValid: false, error: 'Stop loss must be above entry price for short positions' };
    }
  }

  if (takeProfit) {
    if (type === 'long' && takeProfit <= entryPrice) {
      return { isValid: false, error: 'Take profit must be above entry price for long positions' };
    }
    if (type === 'short' && takeProfit >= entryPrice) {
      return { isValid: false, error: 'Take profit must be below entry price for short positions' };
    }
  }

  return { isValid: true };
};
