import { Link } from "react-router-dom";
import { FiUsers, FiBox, FiMap, FiLogOut } from "react-icons/fi";

export default function SidebarAdmin({ open, onClose }) {
  // map para relacionar label -> ruta -> icono
  const items = [
    { label: "Inicio", to: "/admin" },
    { label: "Mozos", to: "/admin/mozos", icon: <FiUsers size={18} /> },
    { label: "Productos", to: "/admin/productos", icon: <FiBox size={18} /> },
    { label: "Mesas", to: "/admin/mesas", icon: <FiMap size={18} /> },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 z-30 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed left-0 top-0 bottom-0 z-40 w-72 max-w-[80%] bg-white shadow-xl transform transition-transform
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full flex">
          <div className="w-full p-6 overflow-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold">
                A
              </div>
              <div>
                <div className="text-sm font-semibold">Administrador</div>
                <div className="text-xs text-gray-500">Administrador</div>
              </div>
            </div>
            <nav className="flex flex-col gap-1">
              {items.map((it) => (
                <Link
                  key={it.to}
                  to={it.to}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition"
                >
                  <div className="text-gray-600">{it.icon ?? <span className="w-4" />}</div>
                  <span className="font-medium">{it.label}</span>
                </Link>
              ))}

              <div className="border-t my-4" />

              <Link
                to="/"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition text-red-600"
              >
                <FiLogOut size={18} />
                <span className="font-medium">Cerrar Sesión</span>
              </Link>
            </nav>
          </div>
          <div className="w-2 bg-gradient-to-b from-blue-200/60 to-blue-400/40" />
        </div>
      </aside>
    </>
  );
}