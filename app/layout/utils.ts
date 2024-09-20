export const isInApplicationFlow = () => {
  if (typeof window !== 'undefined') {
    return window.location.pathname.includes('/firm/application/');
  }
  return false;
};
