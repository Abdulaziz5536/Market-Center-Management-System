export const getCurrentUser = () => {
  const userData =
    localStorage.getItem("user");

  if (!userData) {
    return null;
  }

  try {
    return JSON.parse(userData);
  } catch {
    return null;
  }
};


export const isAdmin = () => {
  const user = getCurrentUser();

  return user?.accessLevel === "admin";
};


export const isReadonly = () => {
  const user = getCurrentUser();

  return user?.accessLevel === "readonly";
};