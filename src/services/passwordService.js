const API_URL = import.meta.env.VITE_API_BASE_URL;

// Enviar código al correo
export async function sendRecoveryCode(email) {
  const res = await fetch(`${API_URL}/password/send-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error("Error al enviar código");
  return await res.json();
}

// Verificar código ingresado
export async function verifyRecoveryCode(email, code) {
  const res = await fetch(`${API_URL}/password/verify-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, code }),
  });
  if (!res.ok) throw new Error("Código incorrecto");
  return await res.json();
}

// Resetear contraseña
export async function resetPassword(email, password, password_confirmation) {
  const res = await fetch(`${API_URL}/password/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, password, password_confirmation }),
  });
  if (!res.ok) throw new Error("Error al resetear contraseña");
  return await res.json();
}
