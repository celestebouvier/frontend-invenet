import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => useContext(AuthContext); //hook personalizado que hace más fácil acceder al contexto