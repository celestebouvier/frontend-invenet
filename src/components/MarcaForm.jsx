import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "./Button";

export default function MarcaForm({ mode = "crear" }) {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [marca, setMarca] = useState({ nombre: "" });
  const [mensaje, setMensaje] = useState("");
  const [errores, setErrores] = useState({});
  const [loading, setLoading] = useState(false);

  // Si es eliminar, cargar datos existentes
  useEffect(() => {
    if (mode === "eliminar" && id) {
      setLoading(true);
      fetch(`http://localhost:8000/api/marcas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
        .then((res) => {
          setLoading(false);
          if (!res.ok) throw new Error("Marca no encontrada");
          return res.json();
        })
        .then((data) => setMarca({ nombre: data.nombre }))
        .catch((err) => setMensaje(err.message));
    }
  }, [id, mode, token]);

  const validarCampos = () => {
    const nuevosErrores = {};
    if (mode === "crear" && !marca.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Crear marca
  const crearMarca = async () => {
    if (!validarCampos()) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/marcas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(marca),
      });
      setLoading(false);
      if (!res.ok) throw new Error("Error al crear marca");
      setMensaje("Marca creada correctamente");
      setMarca({ nombre: "" });
      setErrores({});
    } catch (err) {
      setLoading(false);
      setMensaje(err.message);
    }
  };

  // Eliminar marca
  const eliminarMarca = async () => {
    if (!id) return setMensaje("ID de marca no definido");
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/marcas/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      if (!res.ok) throw new Error("Error al eliminar marca");
      setMensaje("Marca eliminada correctamente");
      setMarca({ nombre: "" });
      setErrores({});
    } catch (err) {
      setLoading(false);
      setMensaje(err.message);
    }
  };

  const handleSubmit = () => {
    if (mode === "crear") crearMarca();
    else if (mode === "eliminar") eliminarMarca();
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white rounded shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {mode === "crear" ? "Ingresar Marca" : "Eliminar Marca"}
      </h2>

      {loading && <p className="text-gray-500 mb-2">Cargando...</p>}

      {mode === "crear" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="font-semibold">Nombre *</label>
            <input
              type="text"
              placeholder="Ingrese nombre"
              value={marca.nombre}
              onChange={(e) => setMarca({ ...marca, nombre: e.target.value })}
              className={`border p-2 w-full rounded ${
                errores.nombre ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errores.nombre && <p className="text-red-500 text-sm">{errores.nombre}</p>}
          </div>
        </div>
      )}

      {mode === "eliminar" && (
        <p className="text-gray-700">
          Marca a eliminar: <span className="font-semibold">{marca.nombre}</span>
        </p>
      )}

      <div className="flex gap-4 mt-4">
        <Button text="Aceptar" onClick={handleSubmit} />
      </div>

      {mensaje && <p className="mt-4 text-red-500">{mensaje}</p>}
    </div>
  );
}
