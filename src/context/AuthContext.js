import { createContext } from "react";

/* Solo crea el contexto que nos permite compartir datos de autenticación.
No tiene lógica, solo sirve para almacenar y acceder a datos como el usuario logueado o funciones de login/logout.*/
export const AuthContext = createContext(null);