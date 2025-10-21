import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Printer, ArrowLeft } from "lucide-react";

export default function DetallePDF() {
  const { id } = useParams(); // obtiene el id del dispositivo
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const pdfUrl = `${backendUrl}/api/dispositivos/${id}/ver-qr`;

  // Función de imprimir PDF abriendo en nueva ventana
  const handlePrint = () => {
    const printWindow = window.open(pdfUrl, "_blank");
    if (printWindow) {
      printWindow.addEventListener("load", () => {
        printWindow.focus();
        printWindow.print();
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} logout={logout} />
        <div className="p-6 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Detalle QR del Dispositivo #{id}
          </h1>

          {/* PDF dentro de iframe */}
          <iframe
            src={pdfUrl}
            className="w-full max-w-3xl h-[600px] border rounded"
            title="QR Dispositivo"
          />

          <div className="mt-4 flex gap-4">
            {/* Botón Volver */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              <ArrowLeft size={18} /> Volver
            </button>

            {/* Botón Imprimir */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
            >
              <Printer size={18} /> Imprimir PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
