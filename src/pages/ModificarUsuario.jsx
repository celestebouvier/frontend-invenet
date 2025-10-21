import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Button from "../components/Button";
import { Eye, EyeOff, Edit, ArrowLeft } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function ModificarUsuario() {
  const { user, logout } = useAuth();
  const token = localStorage.getItem("token");
  const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const navigate = useNavigate();

  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("docente");
  const [mensaje, setMensaje] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const rolesDisponibles = ["administrador", "tecnico", "docente"];

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
    const usuario = buscarUsuario();
    if (!usuario) {
      setMensaje("DNI no encontrado.");
      setNombre(""); setEmail(""); setRole("docente"); setPassword("");
      return;
    }
    setNombre(usuario.name);
    setEmail(usuario.email);
    setRole(usuario.role);
    setMensaje("");
  };

  const handleModificar = async () => {
    if (!dni || !nombre || !email || !role) {
      setMensaje("Completar todos los campos obligatorios.");
      return;
    }
    try {
      const body = { name: nombre, email, role };
      if (password) body.password = password;

      const res = await fetch(`${backendUrl}/api/usuarios/${dni}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Error al modificar usuario");
      const data = await res.json();
      setMensaje(`Usuario ${data.name} modificado correctamente.`);
      setPassword("");
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} logout={logout} />
        <div className="p-6 w-full max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Modificar Usuario</h1>

          <div className="bg-white p-6 rounded shadow space-y-4">
            <div>
              <label className="font-semibold">DNI*:</label>
              <input type="text" value={dni} onChange={(e)=>setDni(e.target.value)} className="border p-2 rounded w-full mt-1"/>
              <Button text="Buscar" onClick={handleBuscar} className="mt-2"/>
            </div>

            <div>
              <label className="font-semibold">Nombre*:</label>
              <input type="text" value={nombre} onChange={(e)=>setNombre(e.target.value)} className="border p-2 rounded w-full mt-1"/>
            </div>

            <div>
              <label className="font-semibold">Email*:</label>
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="border p-2 rounded w-full mt-1"/>
            </div>

            <div className="relative">
              <label className="font-semibold">Contraseña:</label>
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Dejar vacío para no cambiar" className="border p-2 rounded w-full mt-1"/>
              <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-2 top-8">
                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>

            <div>
              <label className="font-semibold">Rol*:</label>
              <select value={role} onChange={(e)=>setRole(e.target.value)} className="border p-2 rounded w-full mt-1">
                {rolesDisponibles.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div className="flex justify-center mt-4">
              <Button text="Modificar" onClick={handleModificar} icon={<Edit size={16}/>}/>
            </div>

            {mensaje && <p className="text-center text-red-600 mt-2">{mensaje}</p>}
          </div>

            <div className="flex gap-4 mb-4">
            <Button text="Volver" onClick={() => navigate(-1)} icon={<ArrowLeft size={16} />} />
          </div>
        </div>
      </div>
    </div>
  );
}
