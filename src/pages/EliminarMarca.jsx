import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import MarcaForm from "../components/MarcaForm";

export default function EliminarMarca() {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} logout={logout} />
        <main className="p-6">
          {/* MarcaForm en modo eliminar */}
          <MarcaForm mode="eliminar" />
        </main>
      </div>
    </div>
  );
}
