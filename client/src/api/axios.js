import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/api", // <-- ESTE ES TU PUERTO REAL
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;