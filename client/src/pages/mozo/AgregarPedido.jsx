// 
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { IoTrashOutline, IoAdd } from "react-icons/io5";

// Contextos
import { usePedido } from "../../context/PedidoContext";
import { useComandas } from "../../context/ComandasContext";

export default function AgregarPedido() {

  const navigate = useNavigate();

  // PedidoContext → pedido en curso
  const {
    mesa,
    setMesa,
    items,
    updateCantidad,
    removeItem,
    resetPedido,
    mesasDisponibles,
    setMesasDisponibles
  } = usePedido();

  // ComandasContext → guardar comanda nueva
  const { agregarComanda } = useComandas();


  // ----------------------------------------------------
  // Cargar mesas dinámicamente (solo 1 vez)
  // ----------------------------------------------------
  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch("http://localhost:3000/mesas"); 
        // ⚠️ Cambiá esto por tu API real (o usa getMesasRequest)
      } catch (err) {
        console.log("Error cargando mesas", err);
      }
    };

    // Ya las carga el PedidoContext → no necesitamos recargar
  }, []);


  // ----------------------------------------------------
  // Guardar comanda al aceptar
  // ----------------------------------------------------
  const handleAceptar = () => {
    if (items.length === 0) {
      alert("Debe agregar al menos un producto");
      return;
    }

    // Crear comanda activa
    agregarComanda({
      mesa,
      items
    });

    alert("Comanda registrada correctamente.");

    // Resetear el pedido temporal de PedidoContext
    resetPedido();

    // Ir a la pantalla de comandas activas
    navigate("/mozo/pedidos-abiertos");
  };


  return (
    <div className="p-5">

      <h1 className="text-2xl font-bold text-red-600 mb-4">Agregar pedido</h1>


      {/* Selector de mesa */}
      <select
        value={mesa}
        onChange={(e) => setMesa(e.target.value)}
        className="border p-2 mb-4 w-full"
      >
        {mesasDisponibles.length === 0 ? (
          <option value="">No hay mesas registradas</option>
        ) : (
          mesasDisponibles.map((m) => (
            <option key={m.id} value={m.number}>
              Mesa {m.number}
            </option>
          ))
        )}
      </select>


      {/* Lista de productos agregados */}
      {items.length === 0 ? (
        <p className="text-gray-600">No hay productos agregados.</p>
      ) : (
        items.map((item) => (
          <div key={item.id} className="flex justify-between border-b p-2">
            <div>
              <p className="font-semibold">{item.name}</p>
              <div className="flex items-center gap-2 text-sm mt-1">
                <button
                  className="px-2 py-0.5 border rounded-md"
                  onClick={() => updateCantidad(item.id, -1)}
                >
                  -
                </button>

                <span>{item.cantidad}</span>

                <button
                  className="px-2 py-0.5 border rounded-md"
                  onClick={() => updateCantidad(item.id, +1)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="text-red-500"
              onClick={() => removeItem(item.id)}
            >
              <IoTrashOutline size={24} />
            </button>
          </div>
        ))
      )}


      {/* Botón agregar producto */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => navigate("/mozo/seleccionar-producto")}
          className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition"
        >
          <IoAdd size={24} />
        </button>
      </div>


      {/* Botones finales */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => {
            if (confirm("¿Cancelar el pedido?")) {
              resetPedido();
              navigate("/mozo/home");
            }
          }}
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
  );
}