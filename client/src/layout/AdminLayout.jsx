import { useState, useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SidebarAdmin from "../components/SidebarAdmin";
import { GiHamburgerMenu } from "react-icons/gi";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const title = useMemo(() => {
    if (location.pathname === "/admin") return "Panel Administrador";
    if (location.pathname.startsWith("/admin/mozos")) return "Mozos";
    if (location.pathname.startsWith("/admin/productos")) return "Productos";
    if (location.pathname.startsWith("/admin/mesas")) return "Mesas";
    return "";
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar (drawer) */}
      <SidebarAdmin open={open} onClose={() => setOpen(false)} />

      <header className="w-full bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">

            <button
              onClick={() => setOpen(true)}
              className="p-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
              aria-label="Abrir menú"
            >
              <GiHamburgerMenu size={18} />
            </button>

            <h2 className="text-xl font-semibold ml-2">{title}</h2>
          </div>
          <div className="text-sm text-gray-600">ComanDa</div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}