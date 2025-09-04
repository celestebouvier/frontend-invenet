import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ModificarDatosUsuario() {
  const { id } = useParams();
  const { user, setUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email });
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/api/usuarios/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar usuario");
      }

      const updatedUser = await response.json();
      setUser(updatedUser); // actualizar en contexto
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="flex h-screen bg-gray-100">
          <Sidebar />
          
    <div className="flex-1 flex flex-col">
    <Header user={user} logout={logout} />
    </div>
    
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Modificar mis datos</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        <label className="block mb-2">Correo</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
        >
          Guardar cambios
        </button>
      </form>
    </div>
    </div>
  );
}
