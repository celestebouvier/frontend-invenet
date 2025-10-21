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
import RecoverPassword from "./pages/RecoverPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyCode from "./pages/VerifyCode";
import Perfil from "./pages/Perfil";
import ConsultarDispositivos from "./pages/ConsultarDispositivos";
import ReportarAnomalia from "./pages/ReportarAnomalia";
import VerReportes from "./pages/VerReportes";
import CrearOrdenReparacion from "./pages/CrearOrdenReparacion";
import DetallePDF from "./pages/DetallePDF";
import GestionUsuarios from "./pages/GestionUsuarios";
import IngresarUsuario from "./pages/IngresarUsuario";
import ModificarUsuario from "./pages/ModificarUsuario";
import EliminarUsuario from "./pages/EliminarUsuario";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/usuarios/:id" element={<ModificarDatosUsuario />} />


      <Route path="*" element={<NotFound />} />
      <Route path="/gestionardispositivos" element={<GestionarDispositivos />} />
      <Route path="/dispositivos/" element={<IngresarDispositivo />} />
      <Route path="/dispositivos/modificar/:id" element={<ModificarDispositivo />} />
      <Route path="/dispositivos/eliminar/:id" element={<EliminarDispositivo />} />
      <Route path="/dispositivos/buscar" element={<BuscarDispositivo />} />

      <Route path="/dispositivo/:id/pdf" element={<DetallePDF />} />

      <Route path="/gestionar-marcas" element={<GestionarMarcas />} />
      <Route path="/ingresar-marca" element={<IngresarMarca />} />
      <Route path="/eliminar-marca/:id" element={<EliminarMarca />} />
      <Route path="/buscar-marca" element={<BuscarMarca />} />

      <Route path="/recover-password" element={<RecoverPassword />} />
      <Route path="/verify-code" element={<VerifyCode />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/inventario" element={<ConsultarDispositivos />} />

      <Route path="/reportar-anomalia" element={<ReportarAnomalia />} />
      <Route path="/ver-reportes" element={<VerReportes />} />  
      <Route path="/ordenes/crear/:reporteId" element={<CrearOrdenReparacion />} />
      
      <Route path="/usuarios" element={<GestionUsuarios />} />
      <Route path="/usuarios/ingresar" element={<IngresarUsuario />} />
      <Route path="/usuarios/modificar" element={<ModificarUsuario />} />
      <Route path="/usuarios/eliminar" element={<EliminarUsuario />} />

    </Routes>
  );
}

export default App;
