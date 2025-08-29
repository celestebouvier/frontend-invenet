import { useAuth } from "../hooks/useAuth";
import Card from "../components/Card";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-green-700">
            Panel Invenet - {user?.token ? "Usuario logueado" : "Invitado"}
          </h1>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-900"
          >
            Cerrar sesión
          </button>
        </header>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <Card>Dispositivos (mock)</Card>
          <Card>Reportes (mock)</Card>
          <Card>Órdenes (mock)</Card>
          <Card>Usuarios (admin) (mock)</Card>
        </div>
      </div>
    </div>
  );
}
