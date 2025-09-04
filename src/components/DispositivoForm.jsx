import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "./Button";

export default function DispositivoForm({ mode = "crear" }) {
  const { id } = useParams();
  const [dispositivo, setDispositivo] = useState({
    tipo: "",
    marca: "",
    modelo: "",
    nro_serie: "",
    ubicacion: "",
    descripcion: "",
    estado: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [errores, setErrores] = useState({});
  const [enums, setEnums] = useState({
    tipo: [],
    marca: [],
    sala: [],
    estado: [],
  });

  useEffect(() => {
    const fetchEnums = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/dispositivos/enums");
        if (!res.ok) throw new Error("Error al cargar enums");
        const data = await res.json();
        setEnums(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchEnums();
  }, []);

  useEffect(() => {
    if (!id) return;
    const fetchDispositivo = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/dispositivos/${id}`);
        if (!res.ok) throw new Error("Dispositivo no encontrado");
        const data = await res.json();
        setDispositivo(data);
      } catch (err) {
        setMensaje(err.message);
      }
    };
    fetchDispositivo();
  }, [id]);

  const validarCampos = () => {
    const nuevosErrores = {};
    if (mode !== "eliminar") {
      if (!dispositivo.modelo.trim()) nuevosErrores.modelo = "El modelo es obligatorio";
      if (!dispositivo.descripcion.trim()) nuevosErrores.descripcion = "La descripción es obligatoria";
      if (!dispositivo.nro_serie.trim()) nuevosErrores.nro_serie = "El número de serie es obligatorio";
      if (!enums.tipo.includes(dispositivo.tipo)) nuevosErrores.tipo = "Seleccione un tipo válido";
      if (!enums.marca.includes(dispositivo.marca)) nuevosErrores.marca = "Seleccione una marca válida";
      if (!enums.sala.includes(dispositivo.ubicacion)) nuevosErrores.ubicacion = "Seleccione una sala válida";
      if (!enums.estado.includes(dispositivo.estado)) nuevosErrores.estado = "Seleccione un estado válido";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const crearDispositivo = async () => {
    if (!validarCampos()) return;
    try {
      const res = await fetch("http://localhost:8000/api/dispositivos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dispositivo),
      });
      if (!res.ok) throw new Error("Error al crear dispositivo");
      setMensaje("Dispositivo creado correctamente");
      setDispositivo({
        tipo: "",
        marca: "",
        modelo: "",
        nro_serie: "",
        ubicacion: "",
        descripcion: "",
        estado: "",
      });
      setErrores({});
    } catch (err) {
      setMensaje(err.message);
    }
  };

  const modificarDispositivo = async () => {
    if (!validarCampos()) return;
    try {
      const res = await fetch(`http://localhost:8000/api/dispositivos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dispositivo),
      });
      if (!res.ok) throw new Error("Error al actualizar");
      setMensaje("Dispositivo modificado correctamente");
    } catch (err) {
      setMensaje(err.message);
    }
  };

  const eliminarDispositivo = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/dispositivos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar");
      setMensaje("Dispositivo eliminado correctamente");
      setDispositivo({
        tipo: "",
        marca: "",
        modelo: "",
        nro_serie: "",
        ubicacion: "",
        descripcion: "",
        estado: "",
      });
      setErrores({});
    } catch (err) {
      setMensaje(err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white rounded shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {mode === "crear" ? "Ingresar Dispositivo" :
         mode === "modificar" ? "Modificar Dispositivo" :
         "Eliminar Dispositivo"}
      </h2>

      {/* Campos en grid similar a la interfaz */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["crear", "modificar"].includes(mode) && (
          <>
            <div className="space-y-2">
              <label className="font-semibold">Modelo *</label>
              <input
                type="text"
                placeholder="Ingrese modelo"
                value={dispositivo.modelo}
                onChange={(e) => setDispositivo({ ...dispositivo, modelo: e.target.value })}
                className={`border p-2 w-full rounded ${errores.modelo ? "border-red-500" : "border-gray-300"}`}
              />
              {errores.modelo && <p className="text-red-500 text-sm">{errores.modelo}</p>}
            </div>

            <div className="space-y-2">
              <label className="font-semibold">Descripción *</label>
              <input
                type="text"
                placeholder="Ingrese descripción"
                value={dispositivo.descripcion}
                onChange={(e) => setDispositivo({ ...dispositivo, descripcion: e.target.value })}
                className={`border p-2 w-full rounded ${errores.descripcion ? "border-red-500" : "border-gray-300"}`}
              />
              {errores.descripcion && <p className="text-red-500 text-sm">{errores.descripcion}</p>}
            </div>

            <div className="space-y-2">
              <label className="font-semibold">Número de serie *</label>
              <input
                type="text"
                placeholder="Ingrese número de serie"
                value={dispositivo.nro_serie}
                onChange={(e) => setDispositivo({ ...dispositivo, nro_serie: e.target.value })}
                className={`border p-2 w-full rounded ${errores.nro_serie ? "border-red-500" : "border-gray-300"}`}
              />
              {errores.nro_serie && <p className="text-red-500 text-sm">{errores.nro_serie}</p>}
            </div>

            <div className="space-y-2">
              <label className="font-semibold">Tipo de dispositivo *</label>
              <select
                value={dispositivo.tipo}
                onChange={(e) => setDispositivo({ ...dispositivo, tipo: e.target.value })}
                className={`border p-2 w-full rounded ${errores.tipo ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">Seleccione tipo</option>
                {enums.tipo.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              {errores.tipo && <p className="text-red-500 text-sm">{errores.tipo}</p>}
            </div>

            <div className="space-y-2">
              <label className="font-semibold">Marca *</label>
              <select
                value={dispositivo.marca}
                onChange={(e) => setDispositivo({ ...dispositivo, marca: e.target.value })}
                className={`border p-2 w-full rounded ${errores.marca ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">Seleccione marca</option>
                {enums.marca.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              {errores.marca && <p className="text-red-500 text-sm">{errores.marca}</p>}
            </div>

            <div className="space-y-2">
              <label className="font-semibold">Sala *</label>
              <select
                value={dispositivo.ubicacion}
                onChange={(e) => setDispositivo({ ...dispositivo, ubicacion: e.target.value })}
                className={`border p-2 w-full rounded ${errores.ubicacion ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">Seleccione sala</option>
                {enums.sala.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errores.ubicacion && <p className="text-red-500 text-sm">{errores.ubicacion}</p>}
            </div>

            <div className="space-y-2">
              <label className="font-semibold">Estado *</label>
              <select
                value={dispositivo.estado}
                onChange={(e) => setDispositivo({ ...dispositivo, estado: e.target.value })}
                className={`border p-2 w-full rounded ${errores.estado ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">Seleccione estado</option>
                {enums.estado.map((e) => <option key={e} value={e}>{e}</option>)}
              </select>
              {errores.estado && <p className="text-red-500 text-sm">{errores.estado}</p>}
            </div>
          </>
        )}
      </div>

      {/* Botón */}
      <div className="flex gap-4 mt-4">
        {mode === "crear" && <Button text="Aceptar" onClick={crearDispositivo} />}
        {mode === "modificar" && <Button text="Aceptar" onClick={modificarDispositivo} />}
        {mode === "eliminar" && <Button text="Aceptar" onClick={eliminarDispositivo} />}
      </div>

      {mensaje && <p className="mt-4 text-red-500">{mensaje}</p>}
    </div>
  );
}
