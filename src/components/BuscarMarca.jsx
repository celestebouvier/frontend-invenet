import { useState } from "react";
import { findMarcaByName } from "../services/marcaService";
import { useNavigate } from "react-router-dom";

export default function BuscarMarca() {
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleBuscar = async () => {
    try {
      const marca = await findMarcaByName(nombre);
      if (!marca) {
        setError("Marca no encontrada");
      } else {
        navigate(`/eliminar-marca/${marca.id}`);
      }
    } catch {
      setError("Error al buscar marca");
    }
  };

  return (
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
  );
}
