import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo_lois.png"
export default function AdminSection() {

  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white">
      
     <img src={logo} alt="Logo" className="w-60 mx-auto mb--20" />

      <div className="flex flex-col gap-5 w-[260px]">

        <button
          onClick={() => navigate("/admin/mozos")}
          className="bg-[#007fff] text-white py-3 rounded-xl font-semibold text-lg shadow hover:opacity-90 transition"
        >
          Mozos
        </button>

        <button
          onClick={() => navigate("/admin/productos")}
          className="bg-[#007fff] text-white py-3 rounded-xl font-semibold text-lg shadow hover:opacity-90 transition"
        >
          Productos
        </button>

        <button
          onClick={() => navigate("/admin/mesas")}
          className="bg-[#007fff] text-white py-3 rounded-xl font-semibold text-lg shadow hover:opacity-90 transition"
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