import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import RecoverPassword from "./pages/RecoverPassword";
import ModificarDatosUsuario from "./pages/ModificarDatosUsuario";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/recover-password" element={<RecoverPassword />} />
      <Route path="/usuarios/:id" element={<ModificarDatosUsuario />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
