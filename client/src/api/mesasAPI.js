import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api/mesas",
});

export const getMesasRequest = () => API.get("/");
export const addMesaRequest = (data) => API.post("/", data);
export const updateMesaRequest = (id, data) => API.put(`/${id}`, data);
export const deleteMesaRequest = (id) => API.delete(`/${id}`);