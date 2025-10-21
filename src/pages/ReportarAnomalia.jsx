import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/Button";

export default function ReportarAnomalia() {
  const { user, logout } = useAuth();
  const token = localStorage.getItem("token");
  const [dispositivos, setDispositivos] = useState([]);
  const [selectedDispositivo, setSelectedDispositivo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  // Obtener lista de dispositivos
  useEffect(() => {
    const fetchDispositivos = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/inventario", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        if (!res.ok) throw new Error("Error al obtener dispositivos");
        const data = await res.json();
        setDispositivos(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los dispositivos.");
      }
    };
    fetchDispositivos();
  }, [token]);

  // Enviar reporte
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (!selectedDispositivo || !descripcion.trim()) {
      setError("Debe seleccionar un dispositivo y escribir una descripción.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/reportes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          dispositivo_id: selectedDispositivo,
          descripcion: descripcion,
        }),
      });

      if (response.status === 403) {
        throw new Error("No autorizado. Solo docentes o administradores pueden reportar.");
      }
      if (!response.ok) throw new Error("Error al enviar el reporte.");

      const data = await response.json();
      setMensaje(`Reporte #${data.reporte_id} enviado correctamente. Estado: pendiente`); 
      setSelectedDispositivo("");
      setDescripcion("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} logout={logout} />

        <div className="p-8 max-w-2xl mx-auto bg-white shadow rounded">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Reportar anomalía en dispositivo
          </h1>

          {error && <p className="text-red-600 mb-3 text-center">{error}</p>}
          {mensaje && <p className="text-green-600 mb-3 text-center">{mensaje}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-medium">Seleccionar dispositivo</label>
              <select
                value={selectedDispositivo}
                onChange={(e) => setSelectedDispositivo(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">-- Elegir dispositivo --</option>
                {dispositivos.map((d) => (
                  <option key={d.id} value={d.id}>
                    #{d.id} - {d.tipo} ({d.ubicacion})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Descripción de la anomalía</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows="4"
                className="w-full border p-2 rounded"
                placeholder="Describe el problema detectado..."
              />
            </div>

            <div className="flex justify-center">
              <Button text="Enviar reporte" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}