export const getUserRole = (permissions: any[]) => {
  if (permissions.some(permission => permission.slug === 'reviewer')) {
    return 'reviewer';
  } else if (permissions.some(permission => permission.slug === 'analyst')) {
    return 'analyst';
  } else if (permissions.some(permission => permission.slug === 'screener')) {
    return 'screener';
  } else {
    return 'default';
  }
};
