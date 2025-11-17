import { createContext, useContext, useState, useEffect } from "react";

const HistorialContext = createContext();

export function useHistorial() {
  return useContext(HistorialContext);
}

export function HistorialProvider({ children }) {
  const [historial, setHistorial] = useState(() => {
    try {
      const stored = localStorage.getItem("historialComandas");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Error leyendo historial de localStorage:", err);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("historialComandas", JSON.stringify(historial));
    } catch (err) {
      console.error("Error guardando historial en localStorage:", err);
    }
  }, [historial]);

  const agregarAlHistorial = (registro) => {
    setHistorial((prev) => [...prev, registro]);
  };

  const limpiarHistorial = () => {
    if (!confirm("¿Vaciar todo el historial de pedidos?")) return;
    setHistorial([]);
    try {
      localStorage.removeItem("historialComandas");
    } catch (err) {
      console.error("Error limpiando historial de localStorage:", err);
    }
  };

  return (
    <HistorialContext.Provider
      value={{
        historial,
        agregarAlHistorial,
        limpiarHistorial,
      }}
    >
      {children}
    </HistorialContext.Provider>
  );
}