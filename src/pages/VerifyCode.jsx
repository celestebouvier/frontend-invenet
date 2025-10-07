import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyRecoveryCode } from "../services/passwordService";

export default function VerifyCode() {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyRecoveryCode(email, code);
      navigate("/reset-password", { state: { email, code } }); // ✅ Pasamos también el código
    } catch {
      setError("El código es incorrecto");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-96 border-2 border-green-700">
        <h2 className="text-xl font-bold text-center mb-4">Verificar código</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ingrese el código recibido"
            className="border p-2 w-full rounded"
            required
          />
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
          >
            Aceptar
          </button>
        </form>
        <button onClick={() => navigate("/login")} className="mt-4 text-green-700">
          ← Volver
        </button>
      </div>
    </div>
  );
}

