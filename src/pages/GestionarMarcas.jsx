import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";

export default function GestionarMarcas() {
  const { user, logout } = useAuth();
  return (
     <div className="flex h-screen bg-gray-100">
           <Sidebar />
     
    <div className="flex-1 flex flex-col">
             <Header user={user} logout={logout} />

    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestión de Marcas</h1>
      <div className="space-x-4">
        <Link
          to="/ingresar-marca"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Ingresar Marca
        </Link>
        <Link
          to="/buscar-marca"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Eliminar Marca
        </Link>
      </div>

      </div>
     </div>
    </div>
  );
}
