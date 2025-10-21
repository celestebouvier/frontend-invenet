import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";

export default function GestionUsuarios() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} logout={logout} />
        <div className="p-6 max-w-3xl mx-auto flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center mb-6">Gestión de Usuarios</h1>

          <div className="flex flex-col md:flex-row gap-4">
            <Button text="Ingresar Usuario" onClick={() => navigate("/usuarios/ingresar")} />
            <Button text="Modificar Usuario" onClick={() => navigate("/usuarios/modificar")} />
            <Button text="Eliminar Usuario" onClick={() => navigate("/usuarios/eliminar")} />
          </div>
        </div>
      </div>
    </div>
  );
}
