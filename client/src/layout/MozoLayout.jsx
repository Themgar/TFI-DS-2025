import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function MozoLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const mozoData = JSON.parse(localStorage.getItem("mozo")) || {
    name: "Mozo",
  };

  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("mozo");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-xl transition-all duration-300 z-40 ${
          open ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Panel Mozo</h2>
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <div className="p-4 border-b flex items-center gap-3">
          <div className="bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
            {mozoData.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold">{mozoData.name}</div>
            <div className="text-sm text-gray-500">Mozo</div>
          </div>
        </div>
        <nav className="flex flex-col p-4 gap-2 text-gray-700">
          <Link
            to="/mozo/home"
            className="p-2 rounded-md hover:bg-gray-200 transition"
            onClick={() => setOpen(false)}
          >
            Inicio
          </Link>

          <Link
            to="/mozo/agregar-pedido"
            className="p-2 rounded-md hover:bg-gray-200 transition"
            onClick={() => setOpen(false)}
          >
            Tomar Pedido
          </Link>

          <Link
            to="/mozo/pedidos-abiertos"
            className="p-2 rounded-md hover:bg-gray-200 transition"
            onClick={() => setOpen(false)}
          >
            Pedidos Abiertos
          </Link>

          <Link
            to="/mozo/historial"
            className="p-2 rounded-md hover:bg-gray-200 transition"
            onClick={() => setOpen(false)}
          >
            Historial
          </Link>

          <button
            className="mt-8 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            onClick={logout}
          >
            Cerrar Sesión
          </button>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="flex items-center gap-4 p-4 bg-white shadow-md">
          <button onClick={() => setOpen(true)}>
            <Menu size={28} />
          </button>
          <h1 className="text-xl font-semibold">Área del Mozo</h1>
        </header>
        <main className="p-4 overflow-y-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}