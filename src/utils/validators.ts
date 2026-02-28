/**
 * Validates that a value is a properly formatted URL
 * @param value - The value to validate
 * @returns true if valid, error message if invalid
 */
export const validateURL = (value: unknown): true | string => {
  const val = value as string
  if (val && !/^https?:\/\/.+/.test(val)) {
    return 'Please enter a valid URL starting with http:// or https://'
  }
  return true
}

/**
 * Validates that a value is a properly formatted email address
 * @param value - The value to validate
 * @returns true if valid, error message if invalid
 */
export const validateEmail = (value: unknown): true | string => {
  const val = value as string
  if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    return 'Please enter a valid email address'
  }
  return true
}

/**
 * Validates that a value is a valid latitude (-90 to 90)
 * @param value - The value to validate
 * @returns true if valid, error message if invalid
 */
export const validateLatitude = (value: unknown): true | string => {
  const val = value as number
  if (val != null && (isNaN(val) || val < -90 || val > 90)) {
    return 'Please enter a valid latitude between -90 and 90'
  }
  return true
}

/**
 * Validates that a value is a valid longitude (-180 to 180)
 * @param value - The value to validate
 * @returns true if valid, error message if invalid
 */
export const validateLongitude = (value: unknown): true | string => {
  const val = value as number
  if (val != null && (isNaN(val) || val < -180 || val > 180)) {
    return 'Please enter a valid longitude between -180 and 180'
  }
  return true
}

/**
 * Validates that a value is a positive number
 * @param value - The value to validate
 * @returns true if valid, error message if invalid
 */
export const validatePositiveNumber = (value: unknown): true | string => {
  const val = value as number
  if (val != null && (isNaN(val) || val < 0)) {
    return 'Please enter a positive number'
  }
  return true
}
