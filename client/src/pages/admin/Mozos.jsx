import { useEffect, useState } from "react";
import ModalAgregarMozo from "../../components/modals/ModalAgregarMozo";
import ModalEditarMozo from "../../components/modals/ModalEditarMozo";
import { getMozosRequest, addMozoRequest, updateMozoRequest, deleteMozoRequest } from "../../api/mozosAPI";

export default function Mozos() {

  const [mozos, setMozos] = useState([]);

  const [agregarOpen, setAgregarOpen] = useState(false);

  const [editarOpen, setEditarOpen] = useState(false);
  const [mozoSeleccionado, setMozoSeleccionado] = useState(null);

  const loadMozos = async () => {
    const res = await getMozosRequest();
    setMozos(res.data);
  };

  useEffect(() => {
    loadMozos();
  }, []);

  const handleAdd = async (nuevo) => {
    await addMozoRequest(nuevo);
    setAgregarOpen(false);
    loadMozos();
  };

  const handleUpdate = async (id, data) => {
    await updateMozoRequest(id, data);
    loadMozos();
    setEditarOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteMozoRequest(id);
    setEditarOpen(false);
    loadMozos();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Mozos habilitados</h3>
        <button
          onClick={() => setAgregarOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Agregar Mozo
        </button>
      </div>

      <div className="grid gap-3">
        {mozos.map(m => (
          <div
            key={m.id}
            onClick={() => {
              setMozoSeleccionado(m);
              setEditarOpen(true);
            }}
            className="cursor-pointer bg-white p-4 rounded-xl shadow flex items-center justify-between hover:shadow-lg transition"
          >
            <div>
              <div className="font-semibold text-lg">{m.name}</div>
              <div className="text-sm text-gray-500">{m.username}</div>
            </div>

            <div className="text-gray-500 text-sm">Editar</div>
          </div>
        ))}
      </div>

      <ModalAgregarMozo
        open={agregarOpen}
        onClose={() => setAgregarOpen(false)}
        onAdd={handleAdd}
      />

      <ModalEditarMozo
        open={editarOpen}
        onClose={() => setEditarOpen(false)}
        mozo={mozoSeleccionado}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}