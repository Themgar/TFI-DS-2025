import { Router } from "express";
import { db } from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // 🔐 Primero: validamos si es el administrador
    const ADMIN_USER = "admin";
    const ADMIN_PASS = "1234"; // Cambialo por lo que quieras

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      return res.json({
        success: true,
        type: "admin",
      });
    }

    // 🧍 Si no es admin, buscamos entre los mozos
    const [rows] = await db.execute(
      "SELECT * FROM mozos WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length > 0) {
      return res.json({
        success: true,
        type: "mozo",
        data: rows[0],
      });
    }

    // 🚫 Si no coincide con ninguno
    res.json({
      success: false,
      message: "Usuario o contraseña incorrectos",
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
});

export default router;