import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import { ClipboardList, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VerReportes() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [reportes, setReportes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Obtener lista de reportes
  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/reportes", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        if (res.status === 403) {
          setError("No autorizado. Solo los administradores pueden acceder.");
          setLoading(false);
          return;
        }
        if (!res.ok) throw new Error("Error al obtener reportes");
        const data = await res.json();
        setReportes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReportes();
  }, [token]);

  const handleGenerarOrden = (reporteId) => {
    navigate(`/ordenes/crear/${reporteId}`);
  };

  if (loading) return <p className="text-center mt-10">Cargando reportes...</p>;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} logout={logout} />

        <div className="p-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Reportes de anomalías
            </h1>
          </div>

          {error && (
            <p className="text-red-600 text-center bg-red-100 p-3 rounded">
              {error}
            </p>
          )}

          {!error && (
            <div className="overflow-x-auto bg-white rounded shadow">
              <table className="w-full text-sm text-center border-collapse">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Usuario</th>
                    <th className="p-3">Dispositivo</th>
                    <th className="p-3">Descripción</th>
                    <th className="p-3">Estado</th>
                    <th className="p-3">Fecha</th>
                    <th className="p-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {reportes.length > 0 ? (
                    reportes.map((r) => (
                      <tr key={r.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">{r.id}</td>
                        <td className="p-2">{r.usuario?.name || "—"}</td>
                        <td className="p-2">{r.dispositivo?.tipo || "—"}</td>
                        <td className="p-2 text-left max-w-xs truncate">
                          {r.descripcion}
                        </td>
                        <td
                          className={`p-2 font-medium ${
                            r.estado === "pendiente"
                              ? "text-yellow-600"
                              : "text-green-700"
                          }`}
                        >
                          {r.estado}
                        </td>
                        <td className="p-2">
                          {new Date(r.created_at).toLocaleString("es-AR")}
                        </td>
                        <td className="p-2">
                          <button
                            onClick={() => handleGenerarOrden(r.id)}
                            className="flex items-center gap-1 bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800 mx-auto"
                          >
                            <Wrench size={16} />
                            Generar orden
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="p-4 text-gray-500">
                        No hay reportes registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
