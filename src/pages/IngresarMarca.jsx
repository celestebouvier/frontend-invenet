// src/pages/IngresarMarca.jsx
import MarcaForm from "../components/MarcaForm";
import { createMarca } from "../services/marcaService";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

export default function IngresarMarca() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);

  const handleCreate = async (nombre) => {
    setErrors(null);
    try {
      await createMarca(nombre);
      alert("Marca creada con éxito");
      navigate("/gestionar-marcas");
    } catch (err) {
      // err es el Error lanzado en service (tiene status y data)
      if (err.status === 422 && err.data?.errors) {
        // muestra mensajes de validación del backend
        setErrors(err.data.errors);
      } else if (err.status === 401) {
        alert("No autorizado. Inicia sesión nuevamente.");
        navigate("/");
      } else {
        alert(err.message || "Error al crear marca");
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} logout={logout} />

        <div className="p-6 max-w-md w-full mx-auto">
          <h2 className="text-xl font-bold mb-4">Ingresar Nueva Marca</h2>

          <MarcaForm onSubmit={handleCreate} />

          {errors?.nombre && (
            <p className="mt-3 text-red-600">{errors.nombre[0]}</p>
          )}
        </div>
      </div>
    </div>
  );
}

