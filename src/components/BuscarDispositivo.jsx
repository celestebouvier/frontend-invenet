// src/components/BuscarDispositivo.jsx
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "./Button";

export default function BuscarDispositivo() {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // action puede ser 'modificar' o 'eliminar'. Default: modificar
  const action = searchParams.get("action") || "modificar";

  const token = localStorage.getItem("token");

  const handleBuscar = async () => {
    setError(null);
    const id = codigo?.toString().trim();
    if (!id) {
      setError("Ingrese un código válido");
      return;
    }

    // Opcional: verificar que exista el dispositivo antes de redirigir
    if (token) {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/api/dispositivos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        setLoading(false);
        if (!res.ok) {
          if (res.status === 404) {
            setError("Dispositivo no encontrado");
            return;
          }
          if (res.status === 401 || res.status === 403) {
            setError("No autorizado para ver ese dispositivo");
            return;
          }
          setError("Error al verificar el dispositivo");
          return;
        }
        // existe → redirigir
        navigate(`/dispositivos/${action}/${id}`);
      } catch (err) {
        setLoading(false);
        setError("Error de red. Intentá de nuevo");
        console.error(err);
      }
    } else {
      // Si no hay token, igual lo llevamos (o podrías forzar login)
      navigate(`/dispositivos/${action}/${id}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">
        {action === "eliminar" ? "Eliminar dispositivo" : "Modificar dispositivo"}
      </h2>

      <label className="block font-medium mb-2">Código del dispositivo (ID)</label>
      <input
        type="number"
        inputMode="numeric"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        placeholder="Ingrese ID (ej: 4)"
        className="w-full border p-2 rounded mb-4"
      />

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="flex gap-3">
        <Button text="Aceptar" onClick={handleBuscar} className="flex-1" />
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border rounded bg-gray-100"
        >
          Cancelar
        </button>
      </div>

      {loading && <p className="mt-2 text-sm text-gray-500">Verificando...</p>}
    </div>
  );
}
