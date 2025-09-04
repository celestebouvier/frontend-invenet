import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";
import { useAuth } from "../hooks/useAuth";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth(); // login viene del contexto

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch {
      setError("Email o contraseña incorrectos");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Card className="w-96">
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="Invenet" className="w-20 h-20" />
        </div>
        <h1 className="text-center text-2xl font-bold mb-6 text-gray-800">
          Invenet
        </h1>
        <Input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="mt-4">
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-black text-base"
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="mt-6">
          <Button
            text="Iniciar Sesión"
            onClick={handleLogin}
            className="text-base py-2"
          />
        </div>
        <div className="mt-4 text-center">
          <a
            href="/password/send-code"
            className="text-sm text-blue-600 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </Card>
    </div>
  );
}


