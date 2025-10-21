import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/Button";
import { Printer } from "lucide-react";
import DetalleDispositivo from "./DetalleDispositivo";
import { useNavigate } from "react-router-dom";

export default function ConsultarDispositivos() {
  const { user, logout } = useAuth();
  const token = localStorage.getItem("token");
  const [dispositivos, setDispositivos] = useState([]);
  const [filtro, setFiltro] = useState("ubicacion");
  const [filtroValor, setFiltroValor] = useState("");
  const [busquedaCodigo, setBusquedaCodigo] = useState("");
  const [selectedDispositivo, setSelectedDispositivo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();


  // Listas de opciones fijas
  const ubicaciones = [
    "Sala Informática 1",
    "Sala Informática 2",
    "Sala Informática 3",
    "Sala Multimedia 1",
    "Sala Multimedia 2",
    "Sala Multimedia 3",
    "Otro",
  ];
  const estados = ["activo", "baja", "en reparacion"];
  const tipos = [
    "CPU",
    "Netbook",
    "Televisor",
    "Proyector",
    "Monitor",
    "Router",
    "Switch",
  ];

  // Cargar inventario desde backend
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
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchDispositivos();
  }, [token]);

  // Ver detalle (abre modal)
  const handleVerDetalle = (id) => {
    navigate(`/dispositivo/${id}/pdf`);
        // Detecta automáticamente el dominio del backend
  //const backendUrl = import.meta.env.VITE_API_URL || window.location.origin.replace(':5173', ':8000');
  //window.open(`${backendUrl}/api/dispositivos/${id}/ver-qr`, '_blank');
  };

  // Filtros
  const filtrarDispositivos = () => {
    let filtrados = [...dispositivos];
    if (busquedaCodigo.trim()) {
      filtrados = filtrados.filter((d) =>
        d.id.toString().includes(busquedaCodigo.trim())
      );
    } else if (filtroValor) {
      filtrados = filtrados.filter(
        (d) => d[filtro]?.toLowerCase() === filtroValor.toLowerCase()
      );
    }
    return filtrados;
  };

  const filtrados = filtrarDispositivos();
  const totalPages = Math.ceil(filtrados.length / itemsPerPage);
  const inicio = (currentPage - 1) * itemsPerPage;
  const paginados = filtrados.slice(inicio, inicio + itemsPerPage);

  // Imprimir tabla completa
  const handlePrint = () => window.print();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header user={user} logout={logout} />

        <div className="p-6">
          <h1 className="text-3xl font-bold text-center mb-6">
            Consultar dispositivos
          </h1>

          {/* Filtros superiores */}
          <div className="flex flex-col lg:flex-row justify-between mb-6 gap-6">

         <div className="flex flex-wrap items-end gap-3">  
            <div>
              <h3 className="font-semibold mb-2">Filtrar inventario:</h3>
              <div className="flex gap-1">
                <Button text="Por ubicación" onClick={() => setFiltro("ubicacion")} />
                <Button text="Por estado" onClick={() => setFiltro("estado")} />
                <Button text="Por tipo" onClick={() => setFiltro("tipo")} />
              </div>
            </div>

                      {/* Selector de filtro */}
          <div className="mt-1">
            {filtro === "ubicacion" && (
              <select
                className="border p-2 rounded"
                value={filtroValor}
                onChange={(e) => setFiltroValor(e.target.value)}
              >
                <option value="">Seleccionar sala</option>
                {ubicaciones.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            )}
            {filtro === "estado" && (
              <select
                className="border p-2 rounded"
                value={filtroValor}
                onChange={(e) => setFiltroValor(e.target.value)}
              >
                <option value="">Seleccionar estado</option>
                {estados.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            )}
            {filtro === "tipo" && (
              <select
                className="border p-2 rounded"
                value={filtroValor}
                onChange={(e) => setFiltroValor(e.target.value)}
              >
                <option value="">Seleccionar tipo</option>
                {tipos.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

            {/* Buscar por código */}
            <div className="flex flex-col items-start lg:items-end">
              <label className="font-semibold">Consultar por código</label>
              <input
                type="text"
                value={busquedaCodigo}
                onChange={(e) => setBusquedaCodigo(e.target.value)}
                placeholder="Ingresar código"
                className="border p-2 rounded w-48 mt-1"
              />
            </div>
          </div>



          {/* Tabla */}
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="w-full text-sm text-center border-collapse">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-3">Código</th>
                  <th className="p-3">Tipo</th>
                  <th className="p-3">Estado</th>
                  <th className="p-3">Historial</th>
                  <th className="p-3">Detalle</th>
                </tr>
              </thead>
              <tbody>
                {paginados.length > 0 ? (
                  paginados.map((d) => (
                    <tr key={d.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{d.id}</td>
                      <td className="p-2">{d.tipo}</td>
                      <td className="p-2 capitalize">{d.estado}</td>
                      <td className="p-2">
                        <button
                          className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
                          onClick={() => alert(`Historial del dispositivo ${d.id}`)}
                        >
                          Ver Historial
                        </button>
                      </td>
                      <td className="p-2">
                        <button
                          className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
                          onClick={() => handleVerDetalle(d.id)}
                        >
                          Ver Detalle
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-gray-500">
                      No se encontraron resultados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className="flex justify-center items-center mt-4 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`px-3 py-1 rounded ${
                  currentPage === num
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Botón imprimir */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handlePrint}
              className="p-3 bg-green-700 text-white rounded-full hover:bg-green-800"
              title="Imprimir"
            >
              <Printer size={20} />
            </button>
          </div>

          {/* Modal de detalle */}
          {selectedDispositivo && (
            <DetalleDispositivo
              dispositivo={selectedDispositivo}
              onClose={() => setSelectedDispositivo(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
