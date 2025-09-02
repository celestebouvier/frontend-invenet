import { useState } from "react"; 
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";
import { useAuth } from "../hooks/useAuth";

export default function ModificarDatosUsuario() {
  const token = localStorage.getItem("token");
  const {user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

 const aceptarModificar = async () => {
    setLoading(true);
    setErrors({});

    try {
      const response = await fetch("/api/usuario", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

const data = await response.json();

      if (!response.ok) {
        if (response.status === 422) {
          // Errores de validación
          setErrors(data.errors || {});
        } else {
          alert("Ocurrió un error al actualizar los datos.");
        }
        return;
      }

      // Datos actualizados correctamente
      setUser(data.user); // actualiza el usuario en el contexto
      alert("Datos actualizados correctamente.");
    } catch (error) {
      console.error("Error:", error);
      alert("Error de red al intentar actualizar los datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Card className="w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Modificar datos</h2>

        <Input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.nombre?.[0]}
        />

        <Input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email?.[0]}
          className="mt-4"
        />

        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password?.[0]}
          className="mt-4"
        />

        <div className="mt-6">
          <Button
            text={loading ? "Guardando..." : "Aceptar"}
            onClick={aceptarModificar}
            className="text-base py-2"
            disabled={loading}
          />
        </div>
      </Card>
    </div>
  );
}