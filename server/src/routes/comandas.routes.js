// src/routes/comandas.routes.js
import { Router } from "express";
import {
  crearComanda,
  listarComandasActivas,
  cerrarComanda,
  historialDelDia
} from "../controllers/comandas.controller.js";

const router = Router();

// Crear comanda
router.post("/", crearComanda);

// Listar comandas activas
router.get("/", listarComandasActivas);

// Cerrar comanda
router.put("/cerrar/:id", cerrarComanda);

// Historial del día
router.get("/historial", historialDelDia);

export default router;