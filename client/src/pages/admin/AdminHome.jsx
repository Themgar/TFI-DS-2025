import { useNavigate } from "react-router-dom";

export default function AdminHome() {

  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col gap-6 text-center">

        <h1 className="text-3xl font-semibold mb-4">Panel Administrador</h1>

        <div className="grid grid-cols-2 gap-6">

          <button 
            onClick={() => navigate("/admin/mozos")}
            className="bg-white shadow-lg rounded-xl p-10 text-xl font-semibold hover:shadow-2xl transition"
          >
            Mozos
          </button>

          <button 
            onClick={() => navigate("/admin/productos")}
            className="bg-white shadow-lg rounded-xl p-10 text-xl font-semibold hover:shadow-2xl transition"
          >
            Productos
          </button>

          <button 
            onClick={() => navigate("/admin/mesas")}
            className="bg-white shadow-lg rounded-xl p-10 text-xl font-semibold hover:shadow-2xl transition"
          >
            Mesas
          </button>

          <button 
            onClick={() => navigate("/")}
            className="bg-red-600 text-white shadow-lg rounded-xl p-10 text-xl font-semibold hover:bg-red-700 transition"
          >
            Cerrar Sesión
          </button>

        </div>

      </div>
    </div>
  );
}