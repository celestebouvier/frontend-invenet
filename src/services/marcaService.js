// src/services/marcaService.js
const API_URL = import.meta.env.VITE_API_BASE_URL; //  http://127.0.0.1:8000/api

function getAuthHeaders(json = true) {
  const token = localStorage.getItem("token");
  const headers = {};
  if (json) headers["Content-Type"] = "application/json";
  headers["Accept"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

async function handleResponse(res) {
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (res.ok) return data;
  const error = new Error((data && (data.message || data.error)) || "Error en la petición");
  error.status = res.status;
  error.data = data;
  throw error;
}

export async function getMarcas() {
  const res = await fetch(`${API_URL}/marcas`, {
    method: "GET",
    headers: getAuthHeaders(), // incluye Authorization
  });
  return handleResponse(res);
}

export async function createMarca(nombre) {
  const res = await fetch(`${API_URL}/marcas`, {
    method: "POST",
    headers: getAuthHeaders(true),
    body: JSON.stringify({ nombre }),
  });
  return handleResponse(res);
}

export async function deleteMarca(id) {
  const res = await fetch(`${API_URL}/marcas/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(false),
  });
  return handleResponse(res);
}

// función que busca por nombre en el backend: (usa getMarcas y filtra)
// Si prefieres, puedes crear un endpoint de búsqueda en Laravel (recomendado).
export async function findMarcaByName(nombre) {
  const marcas = await getMarcas(); // devuelve array de marcas
  if (!Array.isArray(marcas)) return null;
  return marcas.find((m) => m.nombre.toLowerCase() === nombre.trim().toLowerCase()) || null;
}
