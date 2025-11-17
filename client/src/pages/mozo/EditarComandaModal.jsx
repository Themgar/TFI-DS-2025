import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useComandas } from "../../context/ComandasContext";
import { useHistorial } from "../../context/HistorialContext";
import { IoTrashOutline, IoAdd } from "react-icons/io5";

export default function EditarComandaModal({ comanda, onClose }) {
  const navigate = useNavigate();

  const {
    actualizarComanda,
    cerrarComanda,
    calcularTotal,
    setComandaEnEdicionId,
  } = useComandas();

  const { agregarAlHistorial } = useHistorial();

  const [itemsLocal, setItemsLocal] = useState(comanda.items || []);

  useEffect(() => {
    setItemsLocal(comanda.items || []);
  }, [comanda]);

  const cambiarCantidad = (index, delta) => {
    setItemsLocal((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, cantidad: Math.max(1, item.cantidad + delta) }
          : item
      )
    );
  };

  const eliminarItem = (index) => {
    if (!confirm("¿Eliminar este producto?")) return;
    setItemsLocal((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAgregarProducto = () => {
    setComandaEnEdicionId(comanda.id);
    onClose();
    navigate("/mozo/seleccionar-producto");
  };

  const handleCerrarMesa = () => {
    if (!confirm("¿Cerrar mesa y dar por pagado?")) return;

    // 🔹 Obtenemos datos del mozo logueado
    let mozoInfo = null;
    try {
      const raw = localStorage.getItem("mozo");
      if (raw) {
        const m = JSON.parse(raw);
        mozoInfo = {
          id: m.id,
          name: m.name,
          username: m.username,
        };
      }
    } catch (err) {
      console.error("Error leyendo mozo desde localStorage:", err);
    }

    // 🔹 Calculamos total con los items locales (por si no apretó 'Aceptar')
    const total = calcularTotal({ ...comanda, items: itemsLocal });

    // 🔹 Armamos registro de historial
    const ahora = new Date();
    const registroHistorial = {
      id: crypto.randomUUID(),         // id propio del historial
      idComanda: comanda.id,           // referencia a la comanda original
      mesa: comanda.mesa,
      items: itemsLocal,
      total,
      mozo: mozoInfo,
      fecha: ahora.toLocaleDateString("es-AR"),
      hora: ahora.toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      timestamp: ahora.getTime(),
    };

    // 🔹 Guardamos en HistorialContext (y por ende en localStorage)
    agregarAlHistorial(registroHistorial);

    // 🔹 Cerramos la comanda activa (la sacamos de la lista)
    cerrarComanda(comanda.id);

    // 🔹 Cerramos modal
    onClose();
  };

  const handleAceptar = () => {
    actualizarComanda(comanda.id, itemsLocal);
    onClose();
  };

  const total = calcularTotal({ ...comanda, items: itemsLocal });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-4 flex flex-col gap-3">

        <h2 className="text-xl font-semibold mb-2">
          Mesa {comanda.mesa}
        </h2>

        <div className="border rounded-xl p-2 max-h-80 overflow-y-auto">
          {itemsLocal.length === 0 ? (
            <p className="text-gray-500 text-sm">No hay productos.</p>
          ) : (
            itemsLocal.map((item, i) => {
              const subtotal = item.price * item.cantidad;
              return (
                <div
                  key={i}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">
                      {item.name}
                    </span>

                    <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                      <span>Cant:</span>
                      <button
                        className="px-2 py-0.5 border rounded-md"
                        onClick={() => cambiarCantidad(i, -1)}
                      >
                        -
                      </button>
                      <span>{item.cantidad}</span>
                      <button
                        className="px-2 py-0.5 border rounded-md"
                        onClick={() => cambiarCantidad(i, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-green-600">
                      ${subtotal.toFixed(2)}
                    </span>

                    <button
                      className="text-red-500 text-lg"
                      onClick={() => eliminarItem(i)}
                    >
                      <IoTrashOutline />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="font-semibold">Total:</span>
          <span className="font-bold text-green-600">${total.toFixed(2)}</span>
        </div>

        <div className="flex justify-center mt-2">
          <button
            onClick={handleAgregarProducto}
            className="bg-red-500 text-white rounded-full p-3 shadow-lg hover:bg-red-600 transition"
          >
            <IoAdd size={24} />
          </button>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleCerrarMesa}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Cerrar mesa
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-md"
            >
              Cancelar
            </button>

            <button
              onClick={handleAceptar}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Aceptar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}