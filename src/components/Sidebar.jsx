import { Home, FileText, Users, Settings, Wrench } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);


  const menus = [
    { icon: <Home />, label: "Escritorio", path: "/dashboard"  },

    { icon: <Settings />, label: "Recursos", 
    submenus: [
      { label: "Dispositivos", path: "/gestionardispositivos" },
      { label: "Marcas", path: "/marcas" },

    ],},

    { icon: <Wrench />, label: "Reparaciones",
    submenus: [
      { label: "Reportar anomalía", path: "/reportes" },
      { label: "Ver reportes", path: "/reportes" },
      { label: "Generar orden de reparación ", path: "/ordenes" },
      { label: "Ver órdenes de reparación ", path: "/ordenes" },
    ],},

    { icon: <Users />, label: "Usuarios", path: "/usuarios"},

    { icon: <FileText />, label: "Consultas",
     submenus: [
      { label: "Dispositivos", path: "/dispositivos" },
      { label: "Usuarios", path: "/usuarios" },
      { label: "Reparaciones", path: "/ordenes/resumen" },
    ],},
  ];

  return (
    <div
      onMouseEnter={() => setOpen(true)}
       onMouseLeave={() => {
       setOpen(false);
       setOpenMenu(null); // Cierra submenús al salir del sidebar
       }}
      className={`bg-black text-white h-screen p-3 transition-all ${
        open ? "w-50" : "w-15"
      }`}>
    
    <div className="flex justify-center mb-6">
        <img src="/logo.png" alt="Logo" className="h-10 sm:h-10 md:h-10 w-auto" />
    </div>

      {/* Menús */}
      <ul className="space-y-2">
        {menus.map((menu, i) => (
          <li key={i}>
            {menu.submenus ? (
              <>
                {/* Menú con submenús */}
                <div
                  onClick={() => setOpenMenu(openMenu === i ? null : i)}
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded transition-all"
                >
                  {menu.icon}
                  {open && <span>{menu.label}</span>}
                </div>

                {open && openMenu === i && (
                  <ul className="ml-8 mt-1 space-y-1">
                    {menu.submenus.map((sub, idx) => (
                      <li key={idx}>
                        <Link
                          to={sub.path}
                          className="block hover:text-blue-400 text-sm text-gray-300 py-1"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              // Menú con enlace directo
              <Link
                to={menu.path}
                className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded transition-all"
              >
                {menu.icon}
                {open && <span>{menu.label}</span>}
              </Link>
            )}
          </li>
        ))}
      </ul>

    </div>
  );
}
