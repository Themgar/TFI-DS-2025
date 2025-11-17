import axios from "./axios";

// Crear una nueva comanda
export const crearComandaRequest = (data) =>
  axios.post("/comandas", data);

// Obtener todas las comandas abiertas
export const getComandasAbiertasRequest = () =>
  axios.get("/comandas/abiertas");

// Obtener detalle (items) de una comanda
export const getDetalleComandaRequest = (id) =>
  axios.get(`/comandas/detalle/${id}`);

// Actualizar cantidad de un item del detalle
export const updateDetalleCantidadRequest = (idDetalle, cantidad) =>
  axios.put(`/comandas/detalle/${idDetalle}`, { cantidad });

// Eliminar un item del detalle
export const deleteDetalleItemRequest = (idDetalle) =>
  axios.delete(`/comandas/detalle/${idDetalle}`);

// Cerrar una comanda
export const cerrarComandaRequest = (idComanda) =>
  axios.put(`/comandas/cerrar/${idComanda}`);

// Historial del día
export const getHistorialHoyRequest = () =>
  axios.get("/comandas/historial");