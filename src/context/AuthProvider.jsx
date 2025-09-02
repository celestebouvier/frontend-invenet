import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import * as authService from "../services/authService"; // Importa servicios

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);   // Estado global usuario
  const [loading, setLoading] = useState(true);

  // Al iniciar la app, verifica si hay token en el localStorage e intenta cargar datos de usuario si hay token guardado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authService.getUserData()
        .then(data => setUser(data))
        .catch(() => authService.logout());
    }
    setLoading(false);
  }, []);

  // LOGIN usando servicio
  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      localStorage.setItem("token", data.token); // Guardar token
      const userData = await authService.getUserData(); // Obtener datos usuario
      setUser(userData);
      navigate("/dashboard");
      return userData;
    } catch (error) {
      console.error("Error login:", error);
      throw error;
    }
  };

  // LOGOUT usando servicio
  const logout = () => {
    authService.logout();
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
