import { useNavigate } from "react-router-dom";

export default function AdminSection() {

  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white">
      
      <img 
        src="/logo.png"
        alt="Logo"
        className="w-44 mb-10"
      />

      <div className="flex flex-col gap-5 w-[260px]">

        <button
          onClick={() => navigate("/admin/mozos")}
          className="bg-[#FF7070] text-white py-3 rounded-xl font-semibold text-lg shadow hover:opacity-90 transition"
        >
          Mozos
        </button>

        <button
          onClick={() => navigate("/admin/productos")}
          className="bg-[#FF7070] text-white py-3 rounded-xl font-semibold text-lg shadow hover:opacity-90 transition"
        >
          Productos
        </button>

        <button
          onClick={() => navigate("/admin/mesas")}
          className="bg-[#FF7070] text-white py-3 rounded-xl font-semibold text-lg shadow hover:opacity-90 transition"
        >
          Mesas
        </button>

        <button
          onClick={() => navigate("/")}
          className="bg-red-600 text-white py-3 mt-10 rounded-xl font-semibold text-lg shadow hover:bg-red-700 transition"
        >
          Cerrar Sesión
        </button>

      </div>

    </div>
  );
}   