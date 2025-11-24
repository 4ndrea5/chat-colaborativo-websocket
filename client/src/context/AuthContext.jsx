// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { getMe } from "../api/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const data = await getMe();
      setUser(data);
      navigate("/dashboard"); // redirige automáticamente al dashboard si hay usuario
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
