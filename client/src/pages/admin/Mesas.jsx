import { useEffect, useState } from "react";
import { getMesasRequest, addMesaRequest, updateMesaRequest, deleteMesaRequest } from "../../api/mesasAPI";
import ModalEditarMesa from "../../components/modals/ModalEditarMesa";
import ModalConfirmacion from "../../components/modals/ModalConfirmacion";

export default function Mesas() {
  const [mesas, setMesas] = useState([]);
  const [editarOpen, setEditarOpen] = useState(false);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [confirmEliminar, setConfirmEliminar] = useState(false);

  const loadMesas = async () => {
    const res = await getMesasRequest();
    setMesas(res.data);
  };

  useEffect(() => {
    loadMesas();
  }, []);

  const handleAgregar = async () => {
    const nextNumber = mesas.length > 0 ? Math.max(...mesas.map(m => m.number)) + 1 : 1;
    await addMesaRequest({ number: nextNumber });
    loadMesas();
  };

  const handleUpdate = async (id, data) => {
    await updateMesaRequest(id, data);
    setEditarOpen(false);
    loadMesas();
  };

  const handleDelete = async (id) => {
    await deleteMesaRequest(id);
    setConfirmEliminar(false);
    setEditarOpen(false);
    loadMesas();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Mesas</h3>
        <button
          onClick={handleAgregar}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Agregar mesa
        </button>
      </div>

      <div className="grid gap-3">
        {mesas.map((m) => (
          <div
            key={m.id}
            className="bg-white p-4 rounded-xl shadow flex items-center justify-between hover:shadow-lg transition cursor-pointer"
            onClick={() => {
              setMesaSeleccionada(m);
              setEditarOpen(true);
            }}
          >
            <div className="font-semibold text-lg">Mesa {m.number}</div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMesaSeleccionada(m);
                setConfirmEliminar(true);
              }}
              className="text-red-600 hover:text-red-800"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      <ModalEditarMesa
        open={editarOpen}
        mesa={mesaSeleccionada}
        onClose={() => setEditarOpen(false)}
        onUpdate={handleUpdate}
      />

      <ModalConfirmacion
        open={confirmEliminar}
        onClose={() => setConfirmEliminar(false)}
        onConfirm={() => handleDelete(mesaSeleccionada.id)}
        mensaje="¿Desea eliminar esta mesa?"
      />
    </div>
  );
}