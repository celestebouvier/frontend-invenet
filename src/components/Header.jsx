import { UserRound } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header({ user, logout }) {
  return (
    <header className="bg-[#08782b] text-white flex justify-end items-center px-6 py-3 shadow">
      <div className="flex items-center gap-6">
        {/* Botón con icono que redirige a /usuarios/:id */}
        <Link to={`/usuarios/${user?.id}`} className="flex items-center gap-2 text-white">
          <UserRound className="w-5 h-5" />
          <span className="hidden sm:inline font-small">Modificar datos personales</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="font-medium">{user?.name}</span>
          <button
            onClick={logout}
            className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}
