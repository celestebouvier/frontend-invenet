const API_URL = import.meta.env.VITE_API_BASE_URL; // Laravel backend

// Obtener todas las marcas
export async function getMarcas() {
  const res = await fetch(`${API_URL}/marcas`);
  if (!res.ok) throw new Error("Error al obtener marcas");
  return await res.json();
}

// Crear una nueva marca
export async function createMarca(nombre) {
  const res = await fetch(`${API_URL}/marcas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ nombre }),
  });
  if (!res.ok) throw new Error("Error al crear marca");
  return await res.json();
}

// Eliminar una marca
export async function deleteMarca(id) {
  const res = await fetch(`${API_URL}/marcas/${id}`, {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Error al eliminar marca");
  return await res.json();
}

// Buscar una marca por nombre
export async function findMarcaByName(nombre) {
  const marcas = await getMarcas();
  return marcas.find((m) => m.nombre.toLowerCase() === nombre.toLowerCase());
}
