export const setToken = (token: string) => {
  const newToken = `Bearer ${token}`;
  return localStorage.setItem('authorization', newToken);
};

export const getToken = () => {
  return localStorage.getItem('authorization');
};

export const removeToken = () => {
  return localStorage.removeItem('authorization');
};

export const isToken = (): boolean => {
  if (!localStorage.getItem('authorization')) return false;
  return true;
};
