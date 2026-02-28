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
