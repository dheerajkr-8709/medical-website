export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://medical-website-grdw.onrender.com';

export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};
