import { useState } from "react";

const CATEGORIES = [
  "Pizeria","Bebidas","Sangucheria","Papas fritas","Merienda","Picada","Al plato"
];

export default function ModalAgregarProducto({ open, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  if (!open) return null;

  const handleAdd = () => {
    if (!name.trim() || !price) {
      alert("Completar nombre y precio");
      return;
    }
    const nuevo = { name: name.trim(), price: parseInt(price, 10), category };
    onAdd(nuevo);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[360px]">
        <h2 className="text-lg font-semibold mb-3">Agregar producto</h2>

        <label className="text-sm">Nombre</label>
        <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full border rounded p-2 mb-2"/>

        <label className="text-sm">Precio (entero)</label>
        <input value={price} onChange={(e)=>setPrice(e.target.value)} type="number" className="w-full border rounded p-2 mb-2"/>

        <label className="text-sm">Categoría</label>
        <select value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full border rounded p-2 mb-4">
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <div className="flex justify-between">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200">Cancelar</button>
          <button onClick={handleAdd} className="px-4 py-2 rounded bg-green-600 text-white">Agregar</button>
        </div>
      </div>
    </div>
  );
}