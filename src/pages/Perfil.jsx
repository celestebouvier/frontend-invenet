import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";

export default function Perfil() {
  const { user, setUser, logout } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Cargar datos del usuario logueado
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
        password_confirmation: "",
      });
    }
  }, [user]);

  // Manejar cambios en inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validar antes de enviar
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!formData.email.trim()) newErrors.email = "El correo es obligatorio";

    if (formData.password || formData.password_confirmation) {
      if (formData.password.length < 6)
        newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      if (formData.password !== formData.password_confirmation)
        newErrors.password_confirmation = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Enviar cambios al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validate()) return; // Detiene el envío si hay errores

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/perfil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error al actualizar");

      setUser(data.user);
      setMessage("✅ Datos actualizados correctamente");
      setErrors({});
      setFormData({
        ...formData,
        password: "",
        password_confirmation: "",
      });
    } catch (error) {
      setMessage("❌ " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} logout={logout} />

        <div className="p-6 max-w-md mx-auto bg-white shadow rounded mt-8">
          <h2 className="text-xl font-bold mb-4 text-center">
            Modificar mis datos personales
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div>
              <label className="block mb-1 font-medium">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full border p-2 rounded ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Correo */}
            <div>
              <label className="block mb-1 font-medium">Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border p-2 rounded ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Nueva contraseña */}
            <div>
              <label className="block mb-1 font-medium">
                Nueva contraseña (opcional)
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full border p-2 rounded ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirmar contraseña */}
            <div>
              <label className="block mb-1 font-medium">
                Confirmar nueva contraseña
              </label>
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                className={`w-full border p-2 rounded ${
                  errors.password_confirmation ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password_confirmation && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password_confirmation}
                </p>
              )}
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>

            {/* Mensaje general */}
            {message && (
              <p
                className={`mt-4 text-center text-sm ${
                  message.includes("✅")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
