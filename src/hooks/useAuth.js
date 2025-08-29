import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => useContext(AuthContext); // hook que guarda si el usuario está logueado, su token, etc.