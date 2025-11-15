import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mozosRoutes from "./routes/mozos.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import mesasRoutes from "./routes/mesas.routes.js";
import authRoutes from "./routes/auth.routes.js";


console.log(">> Cargando servidor desde:", process.cwd());
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/mozos", mozosRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/mesas", mesasRoutes);
app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto", process.env.PORT);
});