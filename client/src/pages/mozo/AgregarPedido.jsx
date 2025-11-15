import { usePedido } from "../../context/PedidoContext";
import { IoTrashOutline, IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function AgregarPedido() {

  const navigate = useNavigate();
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
  const handleAceptar = () => {
    if (items.length === 0) {
      alert("Debe agregar al menos un producto");
      return;
    }

    alert("Comanda guardada (falta backend)");
    resetPedido();
    navigate("/mozo/home");
  };

  return (
    <div className="p-5">

      <h1 className="text-2xl font-bold text-red-600 mb-4">Agregar pedido</h1>

      {/* Mesa */}
      <select
        value={mesa}
        onChange={(e) => setMesa(e.target.value)}
        className="border p-2 mb-4"
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

      {/* Lista de items */}
      {items.length === 0 ? (
        <p className="text-gray-600">No hay productos.</p>
      ) : (
        items.map((item) => (
          <div key={item.id} className="flex justify-between border-b p-2">
            <div>
              <p className="font-semibold">{item.name}</p>
              <div className="flex items-center gap-2">
                <button onClick={() => updateCantidad(item.id, -1)}>-</button>
                <span>{item.cantidad}</span>
                <button onClick={() => updateCantidad(item.id, +1)}>+</button>
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

      {/* Botón agregar */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => navigate("/mozo/seleccionar-producto")}
          className="bg-red-500 text-white p-3 rounded-full"
        >
          <IoAdd size={24} />
        </button>
      </div>

      {/* Botones finales */}
      <div className="flex justify-between mt-6">
        <button onClick={() => resetPedido()} className="bg-gray-300 p-2">
          Cancelar
        </button>

        <button onClick={handleAceptar} className="bg-green-500 text-white p-2">
          Aceptar
        </button>
      </div>

    </div>
  );
}