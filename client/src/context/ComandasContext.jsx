import { createContext, useContext, useState } from "react";

// Comanda: { id, mesa, items, estado }
// item: { id, name, price, cantidad }

const ComandasContext = createContext();

export function useComandas() {
  return useContext(ComandasContext);
}

export function ComandasProvider({ children }) {
  const [comandas, setComandas] = useState([]);
  const [comandaEnEdicionId, setComandaEnEdicionId] = useState(null);

  // Crear una comanda nueva (desde AgregarPedido)
  const agregarComanda = ({ mesa, items }) => {
    const nueva = {
      id: crypto.randomUUID(),   // 👉 UUID como me pediste
      mesa,
      items,
      estado: "activa",
    };
    setComandas((prev) => [...prev, nueva]);
  };

  // Actualizar los items de una comanda
  const actualizarComanda = (id, nuevosItems) => {
    setComandas((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, items: nuevosItems } : c
      )
    );
  };

  // Elimina completamente la comanda (cancelar pedido)
  const eliminarComanda = (id) => {
    setComandas((prev) => prev.filter((c) => c.id !== id));
  };

  // Cerrar mesa (darla como pagada y quitarla de la lista)
  const cerrarComanda = (id) => {
    setComandas((prev) => prev.filter((c) => c.id !== id));
  };

  // Total de una comanda
  const calcularTotal = (comanda) => {
    if (!comanda) return 0;
    return comanda.items.reduce(
      (acc, item) => acc + item.price * item.cantidad,
      0
    );
  };

  // Agregar producto a comanda EN EDICIÓN (usado desde SeleccionarProducto)
  const agregarProductoAComandaEnEdicion = (producto) => {
    if (!comandaEnEdicionId) return;

    setComandas((prev) =>
      prev.map((c) => {
        if (c.id !== comandaEnEdicionId) return c;

        const existe = c.items.find((it) => it.id === producto.id);
        if (existe) {
          return {
            ...c,
            items: c.items.map((it) =>
              it.id === producto.id
                ? { ...it, cantidad: it.cantidad + 1 }
                : it
            ),
          };
        }

        return {
          ...c,
          items: [...c.items, { ...producto, cantidad: 1 }],
        };
      })
    );
  };

  const limpiarComandaEnEdicion = () => {
    setComandaEnEdicionId(null);
  };

  return (
    <ComandasContext.Provider
      value={{
        comandas,
        agregarComanda,
        actualizarComanda,
        eliminarComanda,
        cerrarComanda,
        calcularTotal,
        comandaEnEdicionId,
        setComandaEnEdicionId,
        agregarProductoAComandaEnEdicion,
        limpiarComandaEnEdicion,
      }}
    >
      {children}
    </ComandasContext.Provider>
  );
}