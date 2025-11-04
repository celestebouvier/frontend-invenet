import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/Button";
import { Wrench, FileDown, ArrowLeft } from "lucide-react";

export default function CrearOrdenReparacion() {
  const { reporteId } = useParams();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [reporte, setReporte] = useState(null);
  const [tecnicos, setTecnicos] = useState([]);
  const [tecnicoId, setTecnicoId] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [modo, setModo] = useState("local"); // "local" o "tecnico"
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");

  // Cargar datos del reporte seleccionado y técnicos disponibles
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [repRes, usersRes] = await Promise.all([
          fetch(`http://localhost:8000/api/reportes`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`http://localhost:8000/api/usuarios`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const reportes = await repRes.json();
        const reporteEncontrado = reportes.find((r) => r.id === parseInt(reporteId));
        setReporte(reporteEncontrado);

        const allUsers = await usersRes.json();
        const tecnicosFiltrados = allUsers.data
          ? allUsers.data.filter((u) => u.role === "tecnico")
          : allUsers.filter((u) => u.role === "tecnico");
        setTecnicos(tecnicosFiltrados);
      } catch (err) {
        console.error("Error al cargar datos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token, reporteId]);

  // Crear orden
  const handleGenerarOrden = async () => {
    if (modo === "tecnico" && !tecnicoId) {
      setMensaje("Debes seleccionar un técnico para enviar la reparación.");
      return;
    }

    try {
      setMensaje("Generando orden...");
      const res = await fetch("http://localhost:8000/api/ordenes", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reporte_id: reporteId,
          tecnico_id: modo === "local" ? user.id : tecnicoId,
          descripcion,
        }),
      });

      if (!res.ok) throw new Error("Error al generar la orden.");
      const orden = await res.json();

      // Actualizar estado del reporte a "revisado"
      await fetch(`http://localhost:8000/api/reportes/${reporteId}/estado`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado: "revisado" }),
      });

      setMensaje("Orden creada correctamente. Generando PDF...");

      // Abrir PDF generado
      const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
      window.open(`${backendUrl}/ordenes/${orden.id}/ver`, "_blank");

      setTimeout(() => {
        navigate("/ver-reportes");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Error al crear la orden.");
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando datos...</p>;
  if (!reporte) return <p className="text-center mt-10">Reporte no encontrado.</p>;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header user={user} logout={logout} />

        <div className="p-8 max-w-3xl mx-auto bg-white rounded shadow">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Crear orden de reparación
            </h1>
          </div>

          {/* Información del reporte */}
          <div className="mb-6 text-gray-700">
            <p><strong>ID Reporte:</strong> {reporte.id}</p>
            <p><strong>Dispositivo:</strong> {reporte.dispositivo?.tipo}</p>
            <p><strong>Descripción:</strong> {reporte.descripcion}</p>
            <p><strong>Estado actual:</strong> {reporte.estado}</p>
          </div>

          {/* Selección de modo */}
          <div className="mb-4">
            <label className="font-semibold block mb-2">Tipo de reparación:</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="modo"
                  value="local"
                  checked={modo === "local"}
                  onChange={() => setModo("local")}
                />
                Reparación local
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="modo"
                  value="tecnico"
                  checked={modo === "tecnico"}
                  onChange={() => setModo("tecnico")}
                />
                Enviar a técnico
              </label>
            </div>
          </div>

          {/* Selección de técnico */}
          {modo === "tecnico" && (
            <div className="mb-4">
              <label className="block font-semibold mb-2">Seleccionar técnico:</label>
              <select
                className="border p-2 rounded w-full"
                value={tecnicoId}
                onChange={(e) => setTecnicoId(e.target.value)}
              >
                <option value="">Seleccione un técnico</option>
                {tecnicos.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.email})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Descripción de reparación */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Detalles o notas:</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full border p-2 rounded"
              rows={3}
              placeholder="Agregar detalles opcionales de la reparación..."
            />
          </div>

          {mensaje && <p className="text-center text-blue-700 mb-4">{mensaje}</p>}

          {/* Botones */}
          <div className="flex justify-center gap-4">
            <Button
              text="Generar Orden"
              onClick={handleGenerarOrden}
              icon={<FileDown size={18} />}
            />
            <Button
              text="Volver"
              onClick={() => navigate("/ver-reportes")}
              icon={<ArrowLeft size={18} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
