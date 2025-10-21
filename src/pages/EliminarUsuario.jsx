import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Button from "../components/Button";
import { Trash2, ArrowLeft } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function EliminarUsuario() {
  const { user, logout } = useAuth();
  const token = localStorage.getItem("token");
  const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const navigate = useNavigate();

  const [dni, setDni] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/usuarios`, {
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        });
        const data = await res.json();
        setUsuarios(data.data || data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsuarios();
  }, []);

  const buscarUsuario = () => usuarios.find((u) => u.id.toString() === dni);

  const handleBuscar = () => {
    const u = buscarUsuario();
    if (!u) {
      setMensaje("DNI no encontrado.");
      setUsuario(null);
      return;
    }
    setUsuario(u);
    setMensaje("");
  };

  const handleEliminar = async () => {
    if (!usuario) return;
    if (!window.confirm(`¿Seguro deseas eliminar al usuario ${usuario.name}?`)) return;
    try {
      const res = await fetch(`${backendUrl}/api/usuarios/${usuario.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al eliminar usuario");
      setMensaje(`Usuario ${usuario.name} eliminado correctamente.`);
      setUsuario(null);
      setDni("");
      setUsuarios(usuarios.filter(u => u.id !== usuario.id));
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} logout={logout} />
        <div className="p-6 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Eliminar Usuario</h1>

          <div className="flex gap-4 mb-4">
            <Button text="Volver" onClick={() => navigate(-1)} icon={<ArrowLeft size={16} />} />
          </div>

          <div className="bg-white p-6 rounded shadow space-y-4">
            <div>
              <label className="font-semibold">DNI*:</label>
              <input type="text" value={dni} onChange={(e)=>setDni(e.target.value)} className="border p-2 rounded w-full mt-1"/>
              <Button text="Buscar" onClick={handleBuscar} className="mt-2"/>
            </div>

            {usuario && (
              <div className="border p-4 rounded mt-4 bg-gray-50 space-y-2">
                <p><strong>Nombre:</strong> {usuario.name}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>Rol:</strong> {usuario.role}</p>

                <div className="flex justify-center mt-4">
                  <Button text="Eliminar" onClick={handleEliminar} icon={<Trash2 size={16}/>} className="bg-red-600 hover:bg-red-700"/>
                </div>
              </div>
            )}

            {mensaje && <p className="text-center text-red-600 mt-2">{mensaje}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
