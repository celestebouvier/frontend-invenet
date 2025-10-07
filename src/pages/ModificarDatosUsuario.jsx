import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function ModificarDatosUsuario() {
  const { id } = useParams();
  const { user, setUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Cargar datos del usuario logueado
  useEffect(() => {
    if (!user) return;

    // Si el id de la URL NO coincide con el usuario logueado → redirige
    if (parseInt(id) !== user.id) {
      alert("Solo puedes modificar tus propios datos personales.");
      navigate("/dashboard");
      return;
    }

    setFormData({
      name: user.name || "",
      email: user.email || "",
      password: "",
      password_confirmation: "",
    });
    setLoading(false);
  }, [user, id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Sesión no válida. Inicia sesión nuevamente.");
      navigate("/");
      return;
    }

    // Validar contraseñas
    if (formData.password && formData.password !== formData.password_confirmation) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/usuarios/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al actualizar los datos.");
      }

      // Actualizar contexto global y redirigir
      setUser(data);
      alert("Datos actualizados correctamente.");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header user={user} logout={logout} />

        <div className="p-6 max-w-md mx-auto bg-white shadow rounded mt-8">
          <h2 className="text-xl font-bold mb-4 text-center">Modificar mis datos</h2>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-left font-medium">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
              required
            />

            <label className="block mb-2 text-left font-medium">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
              required
            />

            <label className="block mb-2 text-left font-medium">Nueva contraseña (opcional)</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
            />

            <label className="block mb-2 text-left font-medium">
              Confirmar contraseña (opcional)
            </label>
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
            />

            <button
              type="submit"
              className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 transition"
            >
              Guardar cambios
            </button>
          </form>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 w-full py-2 rounded border border-gray-400 hover:bg-gray-100"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
