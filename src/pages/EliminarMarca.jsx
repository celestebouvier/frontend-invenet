import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { deleteMarca } from "../services/marcaService";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function EliminarMarca() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteMarca(id);
      alert("Marca eliminada con éxito");
      navigate("/gestionar-marcas");
    } catch {
      alert("Error al eliminar marca");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
          <Sidebar />
           <div className="flex-1 flex flex-col">
            <Header user={user} logout={logout} />
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Eliminar Marca</h2>
      <p>¿Seguro que deseas eliminar la marca con ID {id}?</p>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        {loading ? "Eliminando..." : "Eliminar"}
      </button>
      </div>
      </div>
    </div>
  );
}
