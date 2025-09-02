import { useAuth } from "../hooks/useAuth";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";


export default function Dashboard() {
  const { user, logout } = useAuth();

 return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header user={user} logout={logout} />

        {/* Contenido principal */}
        <main className="flex-1 p-6 bg-white flex flex-col items-center justify-center">
          <img src="/logo.png" alt="Logo Invenet" className="w-40 mb-4" />
          <h2 className="text-3xl font-bold text-invenetGreen">Invenet</h2>
        </main>

        {/* Footer */}
        <footer className="text-center py-2 text-sm border-t bg-gray-50">
          Copyright © 3° TSAFSI 2025. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
}
