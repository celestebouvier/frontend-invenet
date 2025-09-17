import MarcaForm from "../components/MarcaForm";
import { createMarca } from "../services/marcaService";
import { useNavigate } from "react-router-dom";

export default function IngresarMarca() {
  const navigate = useNavigate();

  const handleCreate = async (nombre) => {
    try {
      await createMarca(nombre);
      alert("Marca creada con éxito");
      navigate("/gestionar-marcas");
    } catch {
      alert("Error al crear marca");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Ingresar Nueva Marca</h2>
      <MarcaForm onSubmit={handleCreate} />
    </div>
  );
}
