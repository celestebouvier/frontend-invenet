import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Button from "../components/Button";
import { Eye, EyeOff, Plus, ArrowLeft } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function IngresarUsuario() {
  const { user, logout } = useAuth();
  const token = localStorage.getItem("token");
  const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const navigate = useNavigate();

  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState(""); // vacío
  const [password, setPassword] = useState(""); // vacío
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("docente");
  const [mensaje, setMensaje] = useState("");
  const rolesDisponibles = ["administrador","tecnico","docente"];
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

  const checkDniExists = () => usuarios.some((u) => u.id.toString() === dni);

  const handleIngresar = async () => {
    if (!dni || !nombre || !role) { // ya no valida email ni password
      setMensaje("Completar todos los campos obligatorios (*)");
      return;
    }
    if (checkDniExists()) {
      setMensaje("El DNI ya existe.");
      return;
    }

    try {
      const res = await fetch(`${backendUrl}/api/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: dni, name: nombre, role }),
      });
      if (!res.ok) throw new Error("Error al crear usuario");
      const data = await res.json();
      setMensaje(`Usuario ${data.name} creado correctamente.`);
      setUsuarios([...usuarios, data]);
      setDni(""); setNombre(""); setEmail(""); setPassword(""); setRole("docente");
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
          <h1 className="text-3xl font-bold mb-6 text-center">Ingresar Usuario</h1>

          <div className="bg-white p-6 rounded shadow space-y-4">
            <div>
              <label className="font-semibold">DNI*:</label>
              <input type="text" value={dni} onChange={(e)=>setDni(e.target.value)} className="border p-2 rounded w-full mt-1"/>
            </div>

            <div>
              <label className="font-semibold">Nombre*:</label>
              <input type="text" value={nombre} onChange={(e)=>setNombre(e.target.value)} className="border p-2 rounded w-full mt-1"/>
            </div>

            <div>
              <label className="font-semibold">Email:</label>
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="border p-2 rounded w-full mt-1" placeholder="Ingresar correo electrónico"/>
            </div>

            <div className="relative">
              <label className="font-semibold">Contraseña:</label>
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e)=>setPassword(e.target.value)} className="border p-2 rounded w-full mt-1" placeholder="La contraseña debe contener al menos 8 caracteres, un número, una mayúscula y un caracter especial"/>
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
              <Button text="Ingresar" onClick={handleIngresar} icon={<Plus size={16}/>}/>
            </div>

            {mensaje && <p className="text-center text-red-600 mt-2">{mensaje}</p>}

            <div className="flex gap-4 mb-4">
              <Button text="Volver" onClick={() => navigate(-1)} icon={<ArrowLeft size={16} />} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
