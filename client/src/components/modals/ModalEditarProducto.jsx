import { useEffect, useState } from "react";

const CATEGORIES = [
  "Pizeria","Bebidas","Sangucheria","Papas fritas","Merienda","Picada","Al plato"
];

export default function ModalEditarProducto({ open, onClose, producto, onUpdate, onDelete }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  useEffect(() => {
    if (producto) {
      setName(producto.name || "");
      setPrice(producto.price?.toString() || "");
      setCategory(producto.category || CATEGORIES[0]);
    }
  }, [producto]);

  if (!open) return null;

  const handleSave = () => {
    if (!name.trim() || !price) {
      alert("Completar nombre y precio");
      return;
    }
    onUpdate(producto.id, { name: name.trim(), price: parseInt(price,10), category });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[360px]">
        <h2 className="text-lg font-semibold mb-3">Modificar producto</h2>

        <label className="text-sm">Nombre</label>
        <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full border rounded p-2 mb-2"/>

        <label className="text-sm">Precio (entero)</label>
        <input value={price} onChange={(e)=>setPrice(e.target.value)} type="number" className="w-full border rounded p-2 mb-2"/>

        <label className="text-sm">Categoría</label>
        <select value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full border rounded p-2 mb-4">
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <div className="flex justify-between items-center">
          <button onClick={() => onDelete(producto.id)} className="px-4 py-2 rounded bg-red-600 text-white">Eliminar</button>

          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200">Cancelar</button>
            <button onClick={handleSave} className="px-4 py-2 rounded bg-green-600 text-white">Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  );
}