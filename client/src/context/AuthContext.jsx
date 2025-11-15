import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  const login = (type, data = null) => {
    setRole(type);
    localStorage.setItem("role", type);

    if (type === "mozo" && data) {
      localStorage.setItem("mozo", JSON.stringify(data));
    }
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem("role");
    localStorage.removeItem("mozo");
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);