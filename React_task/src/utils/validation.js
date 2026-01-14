// Validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

export const validateFullName = (name) => {
  return name.trim().length >= 3 && name.trim().length <= 50;
};

export const validateDOB = (dob) => {
  if (!dob) return false;
  const date = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - date.getFullYear();
  return age >= 18 && age <= 80;
};

export const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getMaxDate = () => {
  const today = new Date();
  const minAge = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  return minAge.toISOString().split('T')[0];
};

export const getMinDate = () => {
  const today = new Date();
  const maxAge = new Date(today.getFullYear() - 80, today.getMonth(), today.getDate());
  return maxAge.toISOString().split('T')[0];
};
