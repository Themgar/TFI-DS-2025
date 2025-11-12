import { useState, useEffect } from "react";

export default function ModalEditarMesa({ open, onClose, mesa, onUpdate }) {
  const [number, setNumber] = useState("");

  useEffect(() => {
    if (mesa) setNumber(mesa.number);
  }, [mesa]);

  if (!open) return null;

  const handleSave = () => {
    onUpdate(mesa.id, { number });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[350px] flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-center mb-2">Modificar mesa</h2>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Número</label>
          <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            type="number"
            className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}