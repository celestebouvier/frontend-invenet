import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ModificarDatosUsuario from "./pages/ModificarDatosUsuario";
import GestionarDispositivos from "./pages/GestionarDispositivos";
import IngresarDispositivo from "./pages/IngresarDispositivo";
import ModificarDispositivo from "./pages/ModificarDispositivo";
import EliminarDispositivo from "./pages/EliminarDispositivo";
import BuscarDispositivo from "./components/BuscarDispositivo";
import GestionarMarcas from "./pages/GestionarMarcas";
import IngresarMarca from "./pages/IngresarMarca";
import EliminarMarca from "./pages/EliminarMarca";
import BuscarMarca from "./components/BuscarMarca";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/usuarios/:id" element={<ModificarDatosUsuario />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/gestionardispositivos" element={<GestionarDispositivos />} />
      <Route path="/dispositivos/" element={<IngresarDispositivo />} />
      <Route path="/dispositivos/modificar/:id" element={<ModificarDispositivo />} />
      <Route path="/dispositivos/eliminar/:id" element={<EliminarDispositivo />} />
      <Route path="/dispositivos/buscar" element={<BuscarDispositivo />} />

      <Route path="/gestionarmarcas" element={<GestionarMarcas />} />
      <Route path="/ingresar-marca" element={<IngresarMarca />} />
      <Route path="/eliminar-marca/:id" element={<EliminarMarca />} />
      <Route path="/buscar-marca" element={<BuscarMarca />} />
    </Routes>
  );
}

export default App;
