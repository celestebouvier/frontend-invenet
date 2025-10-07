import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import { X, Printer } from "lucide-react";

export default function DetalleDispositivo({ dispositivo, onClose }) {
  const [qrUrl, setQrUrl] = useState(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    if (dispositivo?.id) {
      // Cargar imagen QR desde backend
      setQrUrl(`http://127.0.0.1:8000/api/dispositivos/${dispositivo.id}/qr-pdf`);
    }
  }, [dispositivo]);

  const handlePrintQR = () => {
    window.open(qrUrl, "_blank");
  };

  if (!dispositivo) return null;

  return (
    
    <div className="flex h-screen bg-gray-100">
          <Sidebar />
    
    <div className="flex-1 flex flex-col">
    <Header user={user} logout={logout} />

    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Detalle del Dispositivo
        </h2>

        <div className="space-y-2 text-left text-gray-700">
          <p><strong>ID:</strong> {dispositivo.id}</p>
          <p><strong>Código:</strong> {dispositivo.codigo}</p>
          <p><strong>Tipo:</strong> {dispositivo.tipo}</p>
          <p><strong>Estado:</strong> {dispositivo.estado}</p>
          <p><strong>Ubicación:</strong> {dispositivo.ubicacion}</p>
          <p><strong>Marca:</strong> {dispositivo.marca?.nombre}</p>
          <p><strong>Descripción:</strong> {dispositivo.descripcion}</p>
        </div>

        {qrUrl && (
          <div className="mt-6 flex flex-col items-center">
            <h3 className="font-semibold mb-2">Etiqueta QR</h3>
            <iframe
              src={qrUrl}
              className="w-48 h-48 border rounded"
              title="Código QR"
            />
          </div>
        )}

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={handlePrintQR}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            <Printer size={18} /> Imprimir QR
          </button>

          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
   </div>
</div>
  );
}
