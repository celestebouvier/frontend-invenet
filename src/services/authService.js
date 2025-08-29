const API_URL = import.meta.env.VITE_API_BASE_URL; // URL del backend desde .env

// LOGIN: envía credenciales y recibe token
export async function login(email, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Email o contraseña incorrectos");
    }

    const data = await response.json();
    return data; // Devuelve el token y/o datos
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
}

// OBTENER DATOS DEL USUARIO AUTENTICADO
export async function getUserData() {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token");

    const res = await fetch(`${API_URL}/user`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    });

    if (!res.ok) throw new Error("Error al obtener datos del usuario");

    return await res.json();
  } catch (error) {
    console.error("Error getUserData:", error);
    throw error;
  }
}

// LOGOUT: borra token del almacenamiento
export function logout() {
  localStorage.removeItem("token");
}
