import { useState } from "react";
import { useHistorial } from "../../context/HistorialContext";

export default function Historial() {
  const { historial, limpiarHistorial } = useHistorial();
  const [seleccionado, setSeleccionado] = useState(null);

  const historialOrdenado = [...historial].sort(
    (a, b) => b.timestamp - a.timestamp
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-semibold text-red-500">
          Historial de pedidos
        </h1>

        {historial.length > 0 && (
          <button
            onClick={limpiarHistorial}
            className="text-sm px-3 py-1 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
          >
            Limpiar historial
          </button>
        )}
      </div>

      {historialOrdenado.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-gray-500 text-sm">
            No hay pedidos cerrados en el historial.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
          {historialOrdenado.map((reg) => (
            <div
              key={reg.id}
              className="flex justify-between items-center p-2 border-b hover:bg-gray-50 cursor-pointer"
              onClick={() => setSeleccionado(reg)}
            >
              <div className="flex flex-col">
                <span className="font-medium">
                  Mesa {reg.mesa}
                </span>
                <span className="text-xs text-gray-500">
                  {reg.fecha} - {reg.hora}
                </span>
                {reg.mozo && (
                  <span className="text-xs text-gray-500">
                    Mozo: {reg.mozo.name}
                  </span>
                )}
              </div>
              <span className="font-semibold text-green-600">
                ${reg.total.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Detalle en modal simple */}
      {seleccionado && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-4 flex flex-col gap-3">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">
                Mesa {seleccionado.mesa}
              </h2>
              <button
                className="text-gray-500 text-sm hover:text-gray-700"
                onClick={() => setSeleccionado(null)}
              >
                Cerrar
              </button>
            </div>

            <div className="text-xs text-gray-500">
              <div>Fecha: {seleccionado.fecha} - {seleccionado.hora}</div>
              {seleccionado.mozo && (
                <div>Mozo: {seleccionado.mozo.name} ({seleccionado.mozo.username})</div>
              )}
            </div>

            <div className="border rounded-xl p-2 max-h-72 overflow-y-auto mt-2">
              {seleccionado.items.length === 0 ? (
                <p className="text-gray-500 text-sm">Sin productos.</p>
              ) : (
                seleccionado.items.map((item, idx) => {
                  const subtotal = item.price * item.cantidad;
                  return (
                    <div
                      key={idx}
                      className="flex justify-between items-center border-b py-1"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {item.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          Cant: {item.cantidad} · ${item.price}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-green-600">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            <div className="flex justify-between items-center mt-2">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-green-600">
                ${seleccionado.total.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-end mt-2">
              <button
                onClick={() => setSeleccionado(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}