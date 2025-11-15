import { createContext, useContext, useState, useEffect } from "react";
import { getMesasRequest } from "../api/mesasAPI"; // ← IMPORTANTE: ajustar si tu ruta es distinta

const PedidoContext = createContext();

export function usePedido() {
  return useContext(PedidoContext);
}

export function PedidoProvider({ children }) {
  const [mesa, setMesa] = useState("");
  const [items, setItems] = useState([]);
  const [mesasDisponibles, setMesasDisponibles] = useState([]);

  // ------------------------------
  // Agregar un producto
  // ------------------------------
  const addItem = (prod) => {
    setItems(prev => {
      const existe = prev.find(p => p.id === prod.id);

      if (existe) {
        return prev.map(p =>
          p.id === prod.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }

      return [...prev, { ...prod, cantidad: 1 }];
    });
  };

  // ------------------------------
  // Cambiar cantidad
  // ------------------------------
  const updateCantidad = (id, delta) => {
    setItems(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, cantidad: Math.max(1, p.cantidad + delta) }
          : p
      )
    );
  };

  // ------------------------------
  // Quitar producto
  // ------------------------------
  const removeItem = (id) => {
    setItems(prev => prev.filter(p => p.id !== id));
  };

  // ------------------------------
  // Resetear pedido
  // ------------------------------
  const resetPedido = () => {
    setItems([]);
    setMesa("");
  };

  // ------------------------------
  // Cargar mesas al iniciar la app
  // ------------------------------
  useEffect(() => {
    const cargarMesas = async () => {
      try {
        const res = await getMesasRequest();
        setMesasDisponibles(res.data);

        // si no hay mesa seleccionada, usar la primera
        if (!mesa && res.data.length > 0) {
          setMesa(res.data[0].number);
        }
      } catch (err) {
        console.log("Error al cargar mesas", err);
      }
    };

    cargarMesas();
  }, []);

  return (
    <PedidoContext.Provider value={{
      mesa,
      setMesa,
      items,
      addItem,
      updateCantidad,
      removeItem,
      resetPedido,
      mesasDisponibles,
      setMesasDisponibles
    }}>
      {children}
    </PedidoContext.Provider>
  );
}