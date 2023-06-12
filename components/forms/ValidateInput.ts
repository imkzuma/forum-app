export const validateEmail = (value: string) => {
  if (!value) {
    return { validateStatus: false, validateMsg: 'Email is required' }
  }
  const emailPattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  if (!emailPattern.test(value)) {
    return { validateStatus: false, validateMsg: 'Email is invalid' }
  }
  return { validateStatus: true, validateMsg: '' }
};

export const validatePassword = (value: string) => {
  if (!value) {
    return { validateStatus: false, validateMsg: 'Password is required' }
  }
  if (value.length < 8) {
    return { validateStatus: false, validateMsg: 'Password must be at least 8 characters' }
  }
  return { validateStatus: true, validateMsg: '' }
}