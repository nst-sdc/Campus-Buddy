export const getStoredTheme = () => {
  return localStorage.getItem('theme') || 'light';
};

export const setStoredTheme = (theme) => {
  localStorage.setItem('theme', theme);
};
