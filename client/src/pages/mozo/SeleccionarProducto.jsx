// import { useState, useEffect } from "react"; 
// import { useNavigate } from "react-router-dom";
// import { getProductosRequest } from "../../api/productosAPI";

// // 👉 Importamos el contexto
// import { usePedido } from "../../context/PedidoContext";

// export default function SeleccionarProducto() {
//   const navigate = useNavigate();
//   const { addItem } = usePedido(); // ← acá está la magia del contexto

//   const [productos, setProductos] = useState([]);
//   const [categoria, setCategoria] = useState("");
//   const [seleccionado, setSeleccionado] = useState(null);

//   const categorias = [
//     "Pizeria",
//     "Bebidas",
//     "Sangucheria",
//     "Papas fritas",
//     "Merienda",
//     "Picada",
//     "Al plato"
//   ];

//   useEffect(() => {
//     loadProductos();
//   }, []);

//   const loadProductos = async () => {
//     try {
//       const res = await getProductosRequest();
//       setProductos(res.data);
//     } catch (err) {
//       console.log("Error cargando productos:", err);
//     }
//   };

//   // Filtrado simple por categoría
//   const productosFiltrados = categoria
//     ? productos.filter((p) => p.category === categoria)
//     : productos;

//   const handleAceptar = () => {
//     if (!seleccionado) return;

//     // 👉 Agregar DIRECTAMENTE AL CONTEXTO
//     addItem(seleccionado);

//     // Volver a la pantalla del pedido
//     navigate("/mozo/tomar-pedido");
//   };

//   const handleCancelar = () => {
//     navigate("/mozo/tomar-pedido");
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <h2 className="text-2xl font-semibold text-center mb-4">
//         Seleccionar producto
//       </h2>

//       {/* Filtro por categoría */}
//       <select
//         className="border p-2 rounded-md w-full mb-3"
//         value={categoria}
//         onChange={(e) => setCategoria(e.target.value)}
//       >
//         <option value="">Seleccione una categoría</option>
//         {categorias.map((c) => (
//           <option key={c} value={c}>
//             {c}
//           </option>
//         ))}
//       </select>

//       {/* Listado de productos */}
//       <div className="max-h-80 overflow-y-auto flex flex-col gap-2">
//         {productosFiltrados.map((prod) => (
//           <div
//             key={prod.id}
//             onClick={() => setSeleccionado(prod)}
//             className={`p-3 border rounded-lg cursor-pointer transition
//               ${
//                 seleccionado?.id === prod.id
//                   ? "border-green-500 bg-green-50"
//                   : "border-gray-300 hover:bg-gray-100"
//               }
//             `}
//           >
//             <div className="font-semibold">{prod.name}</div>
//             <div className="text-sm text-gray-500">$ {prod.price}</div>
//           </div>
//         ))}
//       </div>

//       {/* Botones */}
//       <div className="flex justify-between mt-6">
//         <button
//           onClick={handleCancelar}
//           className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
//         >
//           Cancelar
//         </button>

//         <button
//           disabled={!seleccionado}
//           onClick={handleAceptar}
//           className={`px-4 py-2 rounded-md text-white transition
//             ${
//               seleccionado
//                 ? "bg-green-600 hover:bg-green-700"
//                 : "bg-gray-400 cursor-not-allowed"
//             }
//           `}
//         >
//           Aceptar
//         </button>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { getProductosRequest } from "../../api/productosAPI";

import { usePedido } from "../../context/PedidoContext";
import { useComandas } from "../../context/ComandasContext";

export default function SeleccionarProducto() {
  const navigate = useNavigate();
  const { addItem } = usePedido();
  const {
    comandaEnEdicionId,
    agregarProductoAComandaEnEdicion,
    limpiarComandaEnEdicion,
  } = useComandas();

  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [seleccionado, setSeleccionado] = useState(null);

  const categorias = [
    "Pizeria",
    "Bebidas",
    "Sangucheria",
    "Papas fritas",
    "Merienda",
    "Picada",
    "Al plato"
  ];

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    try {
      const res = await getProductosRequest();
      setProductos(res.data);
    } catch (err) {
      console.log("Error cargando productos:", err);
    }
  };

  const productosFiltrados = categoria
    ? productos.filter((p) => p.category === categoria)
    : productos;

  const handleAceptar = () => {
    if (!seleccionado) return;

    // 👉 Si venimos de editar una comanda (modal)
    if (comandaEnEdicionId) {
      agregarProductoAComandaEnEdicion(seleccionado);
      limpiarComandaEnEdicion();
      navigate("/mozo/pedidos-abiertos");
    } else {
      // 👉 Flujo normal: agregar al pedido en curso
      addItem(seleccionado);
      navigate("/mozo/agregar-pedido");
    }
  };

  const handleCancelar = () => {
    if (comandaEnEdicionId) {
      limpiarComandaEnEdicion();
      navigate("/mozo/pedidos-abiertos");
    } else {
      navigate("/mozo/agregar-pedido");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Seleccionar producto
      </h2>

      <select
        className="border p-2 rounded-md w-full mb-3"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      >
        <option value="">Seleccione una categoría</option>
        {categorias.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <div className="max-h-80 overflow-y-auto flex flex-col gap-2">
        {productosFiltrados.map((prod) => (
          <div
            key={prod.id}
            onClick={() => setSeleccionado(prod)}
            className={`p-3 border rounded-lg cursor-pointer transition
              ${
                seleccionado?.id === prod.id
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:bg-gray-100"
              }
            `}
          >
            <div className="font-semibold">{prod.name}</div>
            <div className="text-sm text-gray-500">$ {prod.price}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handleCancelar}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
        >
          Cancelar
        </button>

        <button
          disabled={!seleccionado}
          onClick={handleAceptar}
          className={`px-4 py-2 rounded-md text-white transition
            ${
              seleccionado
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }
          `}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}