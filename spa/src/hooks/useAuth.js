export const setToken = (token) => {
  localStorage.setItem('jwttoken', token);
};

export const getToken = () => {
  return localStorage.getItem('jwttoken');
};

export const logout = () => {
  localStorage.removeItem('jwttoken');
};
