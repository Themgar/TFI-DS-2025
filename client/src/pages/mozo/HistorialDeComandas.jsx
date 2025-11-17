import { useState } from "react";
import { useComandas } from "../../context/ComandasContext";
import DetalleComandaModal from "./DetalleComandaModal";

export default function HistorialDeComandas() {
  const { historial, calcularTotal } = useComandas();

  const [comandaSeleccionada, setComandaSeleccionada] = useState(null);

  const abrirDetalle = (comanda) => {
    setComandaSeleccionada(comanda);
  };

  const cerrarModal = () => {
    setComandaSeleccionada(null);
  };

  const totalRecaudado = historial.reduce(
    (acc, c) => acc + calcularTotal(c),
    0
  );

  return (
    <div className="p-5 w-full min-h-screen bg-gray-100">

      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Historial
      </h1>

      <div className="bg-white rounded-xl shadow p-4">
        {historial.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No hay comandas cerradas hoy.
          </p>
        ) : (
          historial.map((c) => (
            <div
              key={c.id}
              className="flex justify-between items-center p-3 border-b hover:bg-gray-50 cursor-pointer"
              onClick={() => abrirDetalle(c)}
            >
              <span className="font-medium">Mesa {c.mesa}</span>

              <span className="font-semibold text-green-600">
                ${calcularTotal(c).toFixed(2)}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">Total recaudado</p>
        <p className="text-2xl font-bold text-red-600">
          ${totalRecaudado.toFixed(2)}
        </p>
      </div>

      {comandaSeleccionada && (
        <DetalleComandaModal
          comanda={comandaSeleccionada}
          onClose={cerrarModal}
        />
      )}
    </div>
  );
}