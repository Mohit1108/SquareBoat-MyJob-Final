export const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  // localStorage.setItem("token", JSON.stringify(user));
  // localStorage.setItem("recruiter_token", JSON.stringify(user));
};

export const removerFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};

// JS TOken
export const getUser = () => {
  const userStr = sessionStorage.getItem("user");
  if (userStr) return userStr;
  else return null;
};
export const getToken = () => {
  return sessionStorage.getItem("token") || null;
};
export const setUserSession = (token, user) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("user", user);
  console.log(sessionStorage);
};
export const removeUserSession = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
};
