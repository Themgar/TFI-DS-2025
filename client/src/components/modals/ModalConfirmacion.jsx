export default function ModalConfirmacion({ open, onClose, onConfirm, mensaje = "¿Desea realizar esta acción?" }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[320px] flex flex-col gap-4">

        <div className="text-lg font-semibold text-center">
          {mensaje}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            Aceptar
          </button>
        </div>

      </div>
    </div>
  );
}