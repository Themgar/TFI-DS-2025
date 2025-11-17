import { IoClose } from "react-icons/io5";

export default function DetalleComandaModal({ comanda, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-4 flex flex-col gap-3">

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Mesa {comanda.mesa}
          </h2>
          <button
            className="text-gray-600 hover:text-black text-xl"
            onClick={onClose}
          >
            <IoClose />
          </button>
        </div>

        <div className="border rounded-xl p-2 max-h-80 overflow-y-auto">
          {comanda.items.length === 0 ? (
            <p className="text-gray-500 text-sm">No hay productos.</p>
          ) : (
            comanda.items.map((item, i) => {
              const subtotal = item.price * item.cantidad;
              return (
                <div
                  key={i}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      Cantidad: {item.cantidad}
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-green-600">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              );
            })
          )}
        </div>

        <button
          onClick={onClose}
          className="bg-green-500 text-white px-4 py-2 rounded-md mt-3"
        >
          Aceptar
        </button>

      </div>
    </div>
  );
}