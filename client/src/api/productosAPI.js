import axios from "axios";

const API = axios.create({
  baseURL: "/api/productos"
});

export const getProductosRequest = () => API.get("/");
export const getProductoRequest = (id) => API.get(`/${id}`);
export const addProductoRequest = (data) => API.post("/", data);
export const updateProductoRequest = (id, data) => API.put(`/${id}`, data);
export const deleteProductoRequest = (id) => API.delete(`/${id}`);