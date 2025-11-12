
import express from "express";
import {
  getProductos,
  getProducto,
  addProducto,
  updateProducto,
  deleteProducto
} from "../controllers/productos.controller.js";

const router = express.Router();
router.use((req, res, next) => {
  console.log("📥 Se recibió una petición en productos:", req.method, req.originalUrl);
  next();
});

console.log("✅ Router de productos cargado correctamente");

router.get("/__alive", (req, res) => {
  console.log("📡 Test interno del router de productos funcionando");
  res.json({ ok: true, where: "productos.routes.js router activo" });
});

router.get("/", getProductos);
router.get("/:id", getProducto);
router.post("/", addProducto);
router.put("/:id", updateProducto);
router.delete("/:id", deleteProducto);

export default router;