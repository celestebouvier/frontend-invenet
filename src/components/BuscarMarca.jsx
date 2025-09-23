// src/components/BuscarMarca.jsx  (si lo usan como página, está bien donde lo tienes)
import { useState } from "react";
import { findMarcaByName } from "../services/marcaService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function BuscarMarca() {
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleBuscar = async () => {
    setError(null);
    if (!nombre.trim()) {
      setError("Ingresa un nombre de marca");
      return;
    }
    try {
      const marca = await findMarcaByName(nombre);
      if (!marca) {
        setError("Marca no encontrada");
      } else {
        navigate(`/eliminar-marca/${marca.id}`);
      }
    } catch (err) {
      if (err.status === 401) {
        alert("No autorizado. Inicia sesión nuevamente.");
        navigate("/");
      } else {
        setError(err.message || "Error al buscar marca");
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} logout={logout} />

        <div className="p-6 max-w-md w-full mx-auto">
          <div className="space-y-4">
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre de la marca"
              className="border p-2 rounded w-full"
            />
            {error && <p className="text-red-600">{error}</p>}
            <button
              onClick={handleBuscar}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Buscar y Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

