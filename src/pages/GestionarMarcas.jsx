// src/pages/GestionarMarcas.jsx
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";

export default function GestionarMarcas() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} logout={logout} />
        <div className="p-6 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-6">Gestión de Marcas</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
            <Button text="Ingresar Marca" onClick={() => navigate("/ingresar-marca")} />
            <Button text="Eliminar Marca" onClick={() => navigate("/buscar-marca")} />
          </div>
        </div>
      </div>
    </div>
  );
}
