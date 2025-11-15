import { useState } from "react";
import { useComandas } from "../../context/ComandasContext";
import EditarComandaModal from "../mozo/EditarComandaModal";
import { IoTrashOutline } from "react-icons/io5";

export default function ComandasActivas() {
  const {
    comandas,
    eliminarComanda,
    calcularTotal,
  } = useComandas();

  const [comandaSeleccionada, setComandaSeleccionada] = useState(null);

  const comandasActivas = comandas; // si querés filtrar por estado = 'activa', acá va

  const abrirComanda = (comanda) => {
    setComandaSeleccionada(comanda);
  };

  const cerrarModal = () => {
    setComandaSeleccionada(null);
  };

  const handleEliminarComanda = (id) => {
    if (!confirm("¿Desea cancelar por completo este pedido?")) return;
    eliminarComanda(id);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-5 flex flex-col gap-4">
      
      <h1 className="text-2xl font-semibold text-red-500 mb-4">
        Pedidos abiertos
      </h1>

      <div className="bg-white rounded-xl shadow p-4">
        {comandasActivas.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No hay mesas con pedidos abiertos.
          </p>
        ) : (
          comandasActivas.map((c) => (
            <div
              key={c.id}
              className="flex justify-between items-center p-2 border-b hover:bg-gray-50 cursor-pointer"
              onClick={() => abrirComanda(c)}
            >
              <div className="flex flex-col">
                <span className="font-medium">Mesa {c.mesa}</span>
                <span className="text-xs text-gray-500">
                  {c.items.length} producto(s)
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-semibold text-green-600">
                  ${calcularTotal(c).toFixed(2)}
                </span>

                <button
                  className="text-red-500 text-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEliminarComanda(c.id);
                  }}
                >
                  <IoTrashOutline />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {comandaSeleccionada && (
        <EditarComandaModal
          comanda={comandaSeleccionada}
          onClose={cerrarModal}
        />
      )}
    </div>
  );
}