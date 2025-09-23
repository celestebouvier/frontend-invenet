import { useState } from "react";
import { sendRecoveryCode } from "../services/passwordService";
import { useNavigate } from "react-router-dom";

export default function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRecoveryCode(email);
      navigate("/verify-code", { state: { email } });
    } catch {
      setError("Error: correo no encontrado");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-96 border-2 border-green-700">
        <h2 className="text-xl font-bold text-center mb-4">Recuperar contraseña</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
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
        <button onClick={() => navigate("/")} className="mt-4 text-green-700">
          ← Volver
        </button>
      </div>
    </div>
  );
}
