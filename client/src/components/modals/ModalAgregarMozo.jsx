import { useState } from "react";

export default function ModalAgregarMozo({ open, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (!open) return null;

  const handleAdd = () => {
    onAdd({ name, username, password });
    setName("");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[350px] flex flex-col gap-4">

        <h2 className="text-xl font-semibold text-center mb-2">Agregar Mozo</h2>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Nombre</label>
          <input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text" 
            className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: Marcos"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Usuario</label>
          <input 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: marcos23"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Contraseña</label>
          <input 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="********"
          />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancelar
          </button>

          <button
            onClick={handleAdd}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Agregar
          </button>
        </div>

      </div>
    </div>
  );
}