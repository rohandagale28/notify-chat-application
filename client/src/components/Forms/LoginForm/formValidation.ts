import { validateEmail } from '@/utils/utils'

// Form validation
export const validateFormData = (formData: { email: string; password: string }) => {
  const errors = {
    email: '',
    password: '',
  }

  if (!formData.email.trim() || !validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email'
  }

  if (formData.password.trim().length < 6) {
    errors.password = 'Password must be 6 characters long'
  }

  return errors
}

// Fields validation
export const validateField = (name: string, value: string) => {
  let error = ''

  if (name === 'email') {
    error = !value.trim() || !validateEmail(value) ? 'Please enter a valid email' : ''
  }

  if (name === 'password') {
    error =
      value.length === 0 ? '' : value.trim().length < 6 ? 'Password must be 6 characters long' : ''
  }

  return error
}
