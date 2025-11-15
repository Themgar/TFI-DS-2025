import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/Logo_lois.png";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", {
        username,
        password,
      });

      if (res.data.success) {
        if (res.data.type === "admin") {
          localStorage.setItem("role", "admin");
          navigate("/admin");
        } else if (res.data.type === "mozo") {
          localStorage.setItem("role", "mozo");
          localStorage.setItem("mozo", JSON.stringify(res.data.data));
          navigate("/mozo/home");
        }
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-10 w-[380px] flex flex-col gap-6">
        <img src={logo} alt="Logo" className="w-50 mx-auto mb-0" />

        <h1 className="text-2xl font-semibold text-center mb-9 text-red-500">
          Iniciar sesión
        </h1>

        <div className="flex flex-col gap-2 mb-3">
          <label className="text-sm font-medium">Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Usuario"
          />
        </div>

        <div className="flex flex-col gap-2 mb-8">
          <label className="text-sm font-medium">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Contraseña"
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          onClick={handleLogin}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold p-2 rounded-md transition"
        >
          Iniciar
        </button>
      </div>
    </div>
  );
}