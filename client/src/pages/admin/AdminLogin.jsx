import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const adminUser = "admin";
    const adminPass = "1234";
    if (username === adminUser && password === adminPass) {
      setError("");
      navigate("/admin");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl rounded-xl p-10 w-[380px] flex flex-col gap-6"
      >
        <h1 className="text-2xl font-semibold text-center mb-2">Iniciar sesión</h1>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresar usuario"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresar contraseña"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-md transition"
        >
          Iniciar
        </button>
      </form>
    </div>
  );
}