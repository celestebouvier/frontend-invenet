import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import DispositivoForm from "../components/DispositivoForm";

export default function EliminarDispositivo() {
  const { user, logout } = useAuth();
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} logout={logout} />
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-4">Eliminar dispositivo</h1>
          <DispositivoForm mode="eliminar" />
        </main>
      </div>
    </div>
  );
}
