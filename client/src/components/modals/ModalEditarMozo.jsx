import { useState, useEffect } from "react";
import ModalConfirmacion from "./ModalConfirmacion";

export default function ModalEditarMozo({ open, onClose, mozo, onUpdate, onDelete }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (mozo) {
      setName(mozo.name);
      setUsername(mozo.username);
      setPassword(mozo.password);
    }
  }, [mozo]);

  const [confirmEliminar, setConfirmEliminar] = useState(false);

  if (!open) return null;

  const handleSave = () => {
  onUpdate(mozo.id, {
    name,
    username,
    password
  });
};

  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl p-6 w-[350px] flex flex-col gap-4">

          <h2 className="text-xl font-semibold text-center mb-2">Modificar Mozo</h2>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Nombre</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Usuario</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Contraseña</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between mt-4">

            <button
              onClick={() => setConfirmEliminar(true)}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
            >
              Eliminar
            </button>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancelar
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Aceptar
              </button>
            </div>
          </div>

        </div>
      </div>

      <ModalConfirmacion
        open={confirmEliminar}
        onClose={() => setConfirmEliminar(false)}
        onConfirm={() => {
          setConfirmEliminar(false);
          onDelete(mozo.id);
        }}
        mensaje="¿Desea realizar esta acción?"
      />
    </>
  );
}