import { Router } from "express";
import { getMesas, addMesa, updateMesa, deleteMesa } from "../controllers/mesas.controller.js";

const router = Router();

router.get("/", getMesas);
router.post("/", addMesa);
router.put("/:id", updateMesa);
router.delete("/:id", deleteMesa);

export default router;