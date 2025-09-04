import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import * as authService from "../services/authService";

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authService
        .getUserData()
        .then((data) => setUser(data))
        .catch(() => authService.logout());
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      localStorage.setItem("token", data.access_token);
      const userData = await authService.getUserData();
      setUser(userData);
      navigate("/dashboard");
      return userData;
    } catch (error) {
      console.error("Error login:", error);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}




