import { Validate } from 'payload'

/**
 * Validates that a value is a properly formatted URL
 */
export const validateURL: Validate = (value) => {
  const val = value as string
  if (val && !/^https?:\/\/.+/.test(val)) {
    return 'Please enter a valid URL starting with http:// or https://'
  }
  return true
}

/**
 * Validates that a value is a properly formatted email address
 */
export const validateEmail: Validate = (value) => {
  const val = value as string
  if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    return 'Please enter a valid email address'
  }
  return true
}

/**
 * Validates that a value is a valid latitude (-90 to 90)
 */
export const validateLatitude: Validate = (value) => {
  const val = value as number
  if (val != null && (isNaN(val) || val < -90 || val > 90)) {
    return 'Please enter a valid latitude between -90 and 90'
  }
  return true
}

/**
 * Validates that a value is a valid longitude (-180 to 180)
 */
export const validateLongitude: Validate = (value) => {
  const val = value as number
  if (val != null && (isNaN(val) || val < -180 || val > 180)) {
    return 'Please enter a valid longitude between -180 and 180'
  }
  return true
}

/**
 * Validates that a value is a positive number
 */
export const validatePositiveNumber: Validate = (value) => {
  const val = value as number
  if (val != null && (isNaN(val) || val < 0)) {
    return 'Please enter a positive number'
  }
  return true
}
