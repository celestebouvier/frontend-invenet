const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function login(email, password) { // CAMBIO: username → email
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ email, password }), // CAMBIO
    });

    if (!response.ok) {
      throw new Error("Email o contraseña incorrectos"); // CAMBIO
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
}

export async function getUserData() {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/user`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    });

    if (!res.ok) throw new Error("Error al obtener datos del usuario");

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function logout() {
  localStorage.removeItem("token");
}
