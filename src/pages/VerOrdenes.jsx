import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";

/**
 * List all orders and allow opening PDF/detail page
 */
export default function VerOrdenes() {
  const { user, logout } = useAuth();
  const token = localStorage.getItem("token");
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Resolve backend URL once (avoids using import.meta.env inside JSX callbacks)
  const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchOrdenes = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${backendUrl}/api/ordenes`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        if (res.status === 403) {
          setError("No autorizado.");
          setOrdenes([]);
          return;
        }
        if (!res.ok) throw new Error("Error al obtener órdenes.");
        const data = await res.json();
        // backend may return {data: [...]} or an array — normalize
        setOrdenes(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        setError(err.message || "Error al cargar órdenes.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrdenes();
  }, [token, backendUrl]);

  const abrirOrdenEnPestana = (id) => {
    const url = `${backendUrl}/ordenes/${id}/ver`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} logout={logout} />

        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Órdenes de reparación</h1>

          {error && (
            <p className="text-red-600 text-center bg-red-100 p-3 rounded mb-4">{error}</p>
          )}

          {loading ? (
            <p className="text-center mt-10">Cargando órdenes...</p>
          ) : (
            <div className="overflow-x-auto bg-white rounded shadow">
              <table className="w-full text-sm text-center border-collapse">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Reporte</th>
                    <th className="p-3">Técnico</th>
                    <th className="p-3">Descripción</th>
                    <th className="p-3">Estado</th>
                    <th className="p-3">Fecha</th>
                    <th className="p-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {ordenes.length > 0 ? (
                    ordenes.map((o) => (
                      <tr key={o.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">{o.id}</td>
                        <td className="p-2">{o.reporte_id ?? (o.reporte?.id || "—")}</td>
                        <td className="p-2">{o.tecnico?.name || (o.tecnico_id ?? "—")}</td>
                        <td className="p-2 text-left max-w-xs truncate">{o.descripcion}</td>
                        <td className="p-2">{o.estado}</td>
                        <td className="p-2">{o.created_at ? new Date(o.created_at).toLocaleString("es-AR") : "—"}</td>
                        <td className="p-2">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => abrirOrdenEnPestana(o.id)}
                              className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800 flex items-center gap-2"
                              type="button"
                            >
                              Ver / Imprimir
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="p-4 text-gray-500">No hay órdenes registradas.</td>
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