// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null means not logged in

  const signIn = (userData) => setUser(userData);
  const signOut = () => setUser(null);

  const logout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      setUser(null);
      localStorage.removeItem("token");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
