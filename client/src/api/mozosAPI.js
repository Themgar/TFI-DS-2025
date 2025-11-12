import axios from "axios";

const API = axios.create({
    baseURL: "/api/mozos"
});

export const getMozosRequest = () => API.get("/");
export const addMozoRequest = (data) => API.post("/", data);
export const updateMozoRequest = (id, data) => API.put(`/${id}`, data);
export const deleteMozoRequest = (id) => API.delete(`/${id}`);