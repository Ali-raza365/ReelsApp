// formValidationWithToast.js
import Toast from 'react-native-toast-message';

// Field priority for showing errors
const fieldPriority = ['email', 'username', 'password', 'confirmPassword'];

// Show error toast message
export const showErrorToast = (message: string) => {
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: message,
    position: 'bottom',
    visibilityTime: 2000,
  });
};

// Show success toast message
export const showSuccessToast = (message: string) => {
  Toast.show({
    type: 'success',
    text1: 'Success',
    text2: message,
    position: 'bottom',
    visibilityTime: 2000,
  });
};

// Validate form and show first error in toast
export const validateForm = (formData: any) => {
  const errors: any = {};
  let isValid = true;

  // Email validation
  if (!formData.email) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email';
    isValid = false;
  }

  // Password validation
  if (!formData.password) {
    errors.password = 'Password is required';
    isValid = false;
  } else if (formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
    isValid = false;
  }


if (formData.confirmPassword !== undefined) {
    // Password validation
  if (formData.confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required';
    isValid = false;
  } 
  
  if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = 'Passwords do not match';
    isValid = false;
  }
}

  // If form is invalid, show first error as toast
  if (!isValid) {
    // Check priority fields first
    for (const field of fieldPriority) {
      if (errors[field]) {
        showErrorToast(errors[field]);
        break;
      }
    }
  }

  return {isValid, errors};
};
