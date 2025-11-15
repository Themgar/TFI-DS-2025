import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo_lois.png";

export default function MozoHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("mozo");
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* Logo */}
      <img src={logo} alt="Logo" className="w-28 mb-6" />

      {/* Botones principales */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={() => navigate("/mozo/agregar-pedido")}
          className="bg-red-500 text-white text-lg font-semibold py-3 rounded-lg shadow-md hover:bg-red-600 transition"
        >
          Tomar pedido
        </button>

        <button
          onClick={() => navigate("/mozo/pedidos-abiertos")}
          className="bg-red-500 text-white text-lg font-semibold py-3 rounded-lg shadow-md hover:bg-red-600 transition"
        >
          Pedidos abiertos
        </button>

        <button
          onClick={() => navigate("/mozo/historial")}
          className="bg-red-500 text-white text-lg font-semibold py-3 rounded-lg shadow-md hover:bg-red-600 transition"
        >
          Historial de pedidos
        </button>

        <button
          onClick={handleLogout}
          className="bg-gray-300 text-gray-700 text-lg font-semibold py-3 rounded-lg shadow-md hover:bg-gray-400 transition mt-2"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}